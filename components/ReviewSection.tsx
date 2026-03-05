import React, { useState, useRef } from 'react';
import { Review, UserProfile } from '../types';
import { Star, ThumbsUp, Image as ImageIcon, X, Upload } from 'lucide-react';
import { ImageWithLoader } from './ImageWithLoader';

interface ReviewSectionProps {
  productId: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'likes'>) => void;
  userProfile: UserProfile;
  t: any;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ productId, reviews, onAddReview, userProfile, t }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productReviews = reviews.filter(r => r.productId === productId);
  const averageRating = productReviews.length > 0 
    ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1) 
    : '0.0';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      alert('Please write a comment');
      return;
    }

    onAddReview({
      productId,
      userId: userProfile.email || 'anonymous',
      userName: userProfile.name || 'Anonymous',
      userAvatar: userProfile.photoUrl || undefined,
      rating,
      comment,
      images: images.length > 0 ? images : undefined
    });

    // Reset form
    setRating(0);
    setComment('');
    setImages([]);
    setIsWriting(false);
  };

  return (
    <div className="py-8 border-t border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{t.detail.reviews} ({productReviews.length})</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-ammi-gold">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className={star <= parseFloat(averageRating) ? "fill-current" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-600">{averageRating} / 5.0</span>
          </div>
        </div>
        
        {!isWriting && (
          <button 
            onClick={() => setIsWriting(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-700 transition-colors"
          >
            {t.detail.write_review}
          </button>
        )}
      </div>

      {isWriting && (
        <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-bold text-gray-800">{t.detail.write_review}</h4>
            <button onClick={() => setIsWriting(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{t.detail.rating}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    size={28} 
                    className={star <= rating ? "text-ammi-gold fill-current" : "text-gray-300"} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.detail.comment_placeholder}
              className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-ammi-maroon/20 focus:border-ammi-maroon min-h-[100px]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Photos</label>
            <div className="flex flex-wrap gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-ammi-maroon hover:text-ammi-maroon transition-colors bg-white"
              >
                <Upload size={20} />
                <span className="text-[10px] mt-1">Add</span>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
                multiple 
              />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-ammi-maroon text-white py-3 rounded-xl font-bold shadow-md hover:bg-rose-800 transition-colors"
          >
            {t.detail.submit_review}
          </button>
        </div>
      )}

      <div className="space-y-6">
        {productReviews.length > 0 ? (
          productReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    {review.userAvatar ? (
                      <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-ammi-softPink text-ammi-maroon font-bold text-lg">
                        {review.userName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 text-sm">{review.userName}</h5>
                    <div className="flex items-center gap-2">
                      <div className="flex text-ammi-gold">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={12} className={star <= review.rating ? "fill-current" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.comment}</p>
              
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                  {review.images.map((img, idx) => (
                    <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 cursor-pointer hover:opacity-90">
                      <ImageWithLoader src={img} alt="Review" className="w-full h-full object-cover" loaderSize={16} />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <button className="flex items-center gap-1 hover:text-ammi-maroon transition-colors">
                  <ThumbsUp size={14} /> Helpful ({review.likes})
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
};
