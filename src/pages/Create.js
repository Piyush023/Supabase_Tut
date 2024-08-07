import { useState } from "react"
import { supabase } from "../Config/supabaseClient"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!title || !rating || !method) {
      setFormError('Please Fill all the Fields.');
      return;
    }

    try {
      // Insert data into Supabase
      const { data, error } = await supabase.from('testTable').insert([{ title, method, rating }]);

      // Handle the error
      if (error) {
        setFormError('Error occurred while inserting data.');
        return;
      }

      // Check if data exists
      if (data) {
        console.log('Insert successful:', data);
        setFormError(null);
        navigate('/');
      }
    } catch (err) {
      // Log any unexpected errors
      console.error('Unexpected error:', err);
      setFormError('Unexpected error occurred.');
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="method">Method: </label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Create Smoothie Recipe</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create