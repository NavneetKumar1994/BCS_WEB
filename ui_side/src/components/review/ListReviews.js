import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';


const ListReviews = ({ reviews }) => {
    return (
        <div className="reviews w-100">
            <h3 style={{fontWeight:'bold'}}><FontAwesomeIcon icon={faUser} /> User's Reviews</h3>
            <hr />
            {reviews && reviews.map(review => (
                <div key={review._id} className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                    </div>
                    <h5 className="text-white" style={{backgroundColor:'seagreen'}}> {review.name}</h5>
                    <p  style={{fontWeight:'normal'}}>{review.comment}</p>
                    <p style={{ color: review.rating >= 4 ? 'seagreen' : review.rating >= 3 ? 'gold' : 'red' }}>
                      <span style={{color:'black'}}>rating:</span>
                        {review.rating} <FontAwesomeIcon icon={faStar} style={{color:'orange'}}/>
                          {review.rating >= 4 ? 
                          <p style={{color:'purple'}}><b >'Bravo doctor! Excellent work...keep it up' </b>
                          </p>: review.rating >= 3 ? <p style={{color:'purple'}}><b >'Good job doctor! Go for best...' </b></p> : 
                          <p style={{color:'purple'}}><b >'Hello doctor! as per feedback, need improvement' </b></p>}
                    </p>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews
