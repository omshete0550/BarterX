import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowLeftRight,
  Check,
  MessageCircle,
  Search,
  X,
} from "lucide-react";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import conversationsData from "../../data/conversations";

import "./SwapRequests.css";

function SwapRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState(conversationsData);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const statusMatches =
        filter === "all" || request.status.toLowerCase() === filter;

      const query = search.trim().toLowerCase();
      const searchMatches =
        !query ||
        request.user.name.toLowerCase().includes(query) ||
        request.product.title.toLowerCase().includes(query) ||
        request.offeredProduct.title.toLowerCase().includes(query);

      return statusMatches && searchMatches;
    });
  }, [filter, requests, search]);

  const requestCounts = {
    all: requests.length,
    pending: requests.filter(
      (request) => request.status.toLowerCase() === "pending",
    ).length,
    accepted: requests.filter(
      (request) => request.status.toLowerCase() === "accepted",
    ).length,
    rejected: requests.filter(
      (request) => request.status.toLowerCase() === "rejected",
    ).length,
  };

  const updateStatus = (id, status) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
            }
          : request,
      ),
    );
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
                <article className="swap-request-card" key={request.id}>
                  <div className="swap-request-user">
                    <img src={request.user.avatar} alt={request.user.name} />

                    <div>
                      <span>{request.user.online ? "Online" : "Offline"}</span>

                      <h2>{request.user.name}</h2>

                      <p>{request.lastMessageTime}</p>
                    </div>
                  </div>

                  <div className="swap-request-products">
                    <div className="swap-request-product">
                      <span>Requested item</span>

                      <img src={request.product.image} alt={request.product.title} />

                      <strong>{request.product.title}</strong>
                    </div>

                    <div className="swap-request-arrow">
                      <ArrowLeftRight size={18} />
                    </div>

                    <div className="swap-request-product">
                      <span>Offered item</span>

                      <img
                        src={request.offeredProduct.image}
                        alt={request.offeredProduct.title}
                      />

                      <strong>{request.offeredProduct.title}</strong>
                    </div>
                  </div>

                  <div className="swap-request-footer">
                    <span
                      className={`swap-request-status ${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>

                    <p>{request.lastMessage}</p>

                    <div className="swap-request-actions">
                      <button
                        type="button"
                        title="Open conversation"
                        onClick={() => navigate("/messages")}
                      >
                        <MessageCircle size={15} />
                        Message
                      </button>

                      {request.status === "Pending" && (
                        <>
                          <button
                            type="button"
                            className="accept"
                            onClick={() => updateStatus(request.id, "Accepted")}
                          >
                            <Check size={15} />
                            Accept
                          </button>

                          <button
                            type="button"
                            className="reject"
                            onClick={() => updateStatus(request.id, "Rejected")}
                          >
                            <X size={15} />
                            Reject
                          </button>
                        </>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SwapRequests;
