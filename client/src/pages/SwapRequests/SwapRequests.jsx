import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowLeftRight,
  Check,
  MessageCircle,
  Search,
  Star,
  X,
} from "lucide-react";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import { changeBarterStatus, completeBarter, fetchBarterRequests } from "../../features/barter/barterSlice";
import { submitRating } from "../../features/ratings/ratingSlice";

import "./SwapRequests.css";

function SwapRequests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { incoming, outgoing, loading, error } = useSelector((state) => state.barter);
  const { submitting: ratingSubmitting, error: ratingError } = useSelector((state) => state.ratings);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [ratingRequest, setRatingRequest] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => { dispatch(fetchBarterRequests()); }, [dispatch]);

  const requests = useMemo(() => [
    ...(Array.isArray(incoming) ? incoming : []).filter(Boolean).map((request) => ({ ...request, direction: "incoming", user: request.requester || {}, requestedProduct: request.requestedProduct || {}, offeredProduct: request.offeredProduct || {}, status: request.status || "pending" })),
    ...(Array.isArray(outgoing) ? outgoing : []).filter(Boolean).map((request) => ({ ...request, direction: "outgoing", user: request.receiver || {}, requestedProduct: request.requestedProduct || {}, offeredProduct: request.offeredProduct || {}, status: request.status || "pending" })),
  ], [incoming, outgoing]);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const statusMatches =
        filter === "all" || request.status === filter;

      const query = search.trim().toLowerCase();
      const searchMatches =
        !query ||
        request.user?.name?.toLowerCase().includes(query) ||
        request.requestedProduct?.title?.toLowerCase().includes(query) ||
        request.offeredProduct?.title?.toLowerCase().includes(query);

      return statusMatches && searchMatches;
    });
  }, [filter, requests, search]);

  const requestCounts = {
    all: requests.length,
    pending: requests.filter(
      (request) => request.status === "pending",
    ).length,
    accepted: requests.filter(
      (request) => request.status === "accepted",
    ).length,
    rejected: requests.filter(
      (request) => request.status === "rejected",
    ).length,
  };

  const updateStatus = (id, status) => dispatch(changeBarterStatus({ id, status }));
  const completeRequest = (id) => dispatch(completeBarter(id));
  const sendRating = async (event) => {
    event.preventDefault();
    if (!ratingRequest?._id) return;
    const result = await dispatch(submitRating({ barterRequest: ratingRequest._id, rating, review: review.trim() }));
    if (submitRating.fulfilled.match(result)) { setRatingRequest(null); setReview(""); }
  };

  return (
    <div className="swap-requests-page">
      <Navbar />

      <main className="swap-requests-main">
        <div className="swap-requests-container">
          <button
            type="button"
            className="swap-requests-back"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft size={15} />
            Back to profile
          </button>

          <section className="swap-requests-header">
            <div>
              <span>REQUEST CENTER</span>

              <h1>Swap Requests</h1>

              <p>Review pending offers, continue chats, and manage swaps.</p>
            </div>

            <button type="button" onClick={() => navigate("/products")}>
              Browse Products
            </button>
          </section>

          <section className="swap-requests-toolbar">
            <div className="swap-request-tabs">
              {["all", "pending", "accepted", "rejected"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                >
                  <span>{item}</span>
                  <strong>{requestCounts[item]}</strong>
                </button>
              ))}
            </div>

            <div className="swap-request-search">
              <Search size={15} />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search requests..."
              />

              {search && (
                <button type="button" onClick={() => setSearch("")}>
                  <X size={13} />
                </button>
              )}
            </div>
          </section>

          <section className="swap-request-list">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <article className="swap-request-card" key={request._id}>
                  <div className="swap-request-user">
                    <img src={request.user?.avatar || "https://placehold.co/80x80"} alt={request.user?.name} />

                    <div>
                      <span>{request.direction === "incoming" ? "Incoming request" : "Sent request"}</span>

                      <h2>{request.user?.name || "BarterX member"}</h2>

                      <p>{new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="swap-request-products">
                    <div className="swap-request-product">
                      <span>Requested item</span>

                      <img src={request.requestedProduct?.images?.[0] || "https://placehold.co/120x90"} alt={request.requestedProduct?.title} />

                      <strong>{request.requestedProduct?.title}</strong>
                    </div>

                    <div className="swap-request-arrow">
                      <ArrowLeftRight size={18} />
                    </div>

                    <div className="swap-request-product">
                      <span>Offered item</span>

                      <img
                        src={request.offeredProduct?.images?.[0] || "https://placehold.co/120x90"}
                        alt={request.offeredProduct?.title || "Offered product"}
                      />

                      <strong>{request.offeredProduct?.title || "Product unavailable"}</strong>
                    </div>
                  </div>

                  <div className="swap-request-footer">
                    <span
                      className={`swap-request-status ${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>

                    <p>{request.message || "No message added."}</p>

                    <div className="swap-request-actions">
                      <button
                        type="button"
                        title="Open conversation"
                        onClick={() => navigate("/messages", { state: {
                          conversationId: request.conversation?._id || request.conversation,
                          participantId: request.user?._id,
                        } })}
                      >
                        <MessageCircle size={15} />
                        Message
                      </button>

                      {request.status === "pending" && request.direction === "incoming" && (
                        <>
                          <button
                            type="button"
                            className="accept"
                            onClick={() => updateStatus(request._id, "accepted")}
                          >
                            <Check size={15} />
                            Accept
                          </button>

                          <button
                            type="button"
                            className="reject"
                            onClick={() => updateStatus(request._id, "rejected")}
                          >
                            <X size={15} />
                            Reject
                          </button>
                        </>
                      )}

                      {request.status === "accepted" && (
                        <button type="button" className="accept" onClick={() => completeRequest(request._id)}>Complete</button>
                      )}

                      {request.status === "completed" && (
                        <button type="button" onClick={() => setRatingRequest(request)}><Star size={15} /> Rate swap</button>
                      )}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="swap-requests-empty">
                <ArrowLeftRight size={30} />

                <h2>No requests found</h2>

                <p>Try another filter or search term.</p>
              </div>
            )}
          </section>
          {loading && <p>Loading swap requests...</p>}
          {error && <p>{error}</p>}

          {ratingRequest && <form onSubmit={sendRating} className="swap-request-list">
            <h2>Rate your swap</h2>
            <p>How was your exchange for {ratingRequest.requestedProduct?.title}?</p>
            <select value={rating} onChange={(event) => setRating(Number(event.target.value))}>
              {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}
            </select>
            <textarea value={review} onChange={(event) => setReview(event.target.value)} maxLength={500} placeholder="Optional review" />
            {ratingError && <p>{ratingError}</p>}
            <button type="submit" disabled={ratingSubmitting}>{ratingSubmitting ? "Submitting..." : "Submit rating"}</button>
            <button type="button" onClick={() => setRatingRequest(null)}>Cancel</button>
          </form>}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SwapRequests;
