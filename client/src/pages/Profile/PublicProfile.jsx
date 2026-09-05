import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";
import ProductGrid from "../../component/product/ProductGrid";
import Button from "../../component/common/Button";
import api from "../../api/axios";
import "./Profile.css";

const normalizeProduct = (product) => ({
  ...product,
  id: product._id,
  image: product.images?.[0] || "https://placehold.co/800x600/f0ebff/6d3df5?text=BarterX",
  category: product.category?.replace(/(^|-)\w/g, (part) => part.toUpperCase()),
  condition: product.condition?.replace(/(^|-)\w/g, (part) => part.toUpperCase()),
});

function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.get(`/users/${id}`), api.get(`/ratings/user/${id}`)]).then(([profileResponse, ratingsResponse]) => {
      setProfile({ ...profileResponse.data.data, ratings: ratingsResponse.data.data.ratings });
    }).catch((requestError) => {
      setError(requestError.response?.data?.message || "Unable to load this profile.");
    });
  }, [id]);

  return <div className="profile-page"><Navbar /><main className="profile-main"><div className="profile-container">
    {error && <div className="profile-error"><h2>{error}</h2><Link to="/products"><Button>Browse Products</Button></Link></div>}
    {!profile && !error && <div className="profile-loading"><p>Loading profile...</p></div>}
    {profile && <>
      <section className="profile-header"><div className="profile-cover" /><div className="profile-header-content">
        <div className="profile-avatar-wrapper"><img src={profile.user.avatar || "https://placehold.co/300x300/f0ebff/6d3df5?text=BX"} alt={profile.user.name} className="profile-avatar" /></div>
        <div className="profile-main-info"><div className="profile-name-row"><div><h1>{profile.user.name}</h1><span>BarterX member</span></div></div>
          <p className="profile-bio">{profile.user.bio || "No bio added yet."}</p><div className="profile-meta"><span><MapPin size={13} />{profile.user.location || "Location not shared"}</span><span><Star size={13} />{profile.summary.averageRating || "No"} rating ({profile.summary.totalRatings})</span></div>
        </div>
      </div></section>
      <section className="profile-section"><div className="profile-section-header"><div><span>AVAILABLE</span><h2>{profile.user.name}'s Products</h2></div></div>
        <ProductGrid products={profile.products.map(normalizeProduct)} />
      </section>
      <section className="profile-section"><div className="profile-section-header"><div><span>COMMUNITY FEEDBACK</span><h2>Reviews</h2></div></div>
        {profile.ratings.length ? <div className="swap-activity">{profile.ratings.map((rating) => <article className="swap-item" key={rating._id}>
          <div className="swap-product-icon"><Star size={16} /></div>
          <div className="swap-item-info"><strong>{rating.reviewer?.name || "BarterX member"} — {rating.rating}/5</strong><span>{rating.review || "No written review."}</span><small>{rating.product?.title || "Completed swap"}</small></div>
        </article>)}</div> : <div className="profile-empty"><Star size={28} /><h3>No reviews yet</h3><p>Completed swap reviews will appear here.</p></div>}
      </section>
    </>}
  </div></main><Footer /></div>;
}

export default PublicProfile;
