import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../Config/supabaseClient"

const Update = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState();
  const [method, setMethod] = useState();
  const [rating, setRating] = useState();
  const [formError, setFormError] = useState();

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('testTable')
        .select()
        .eq('id', id) // Now this will give the output in a Array
        .single() // To Get the output from the supabase as a single Object we use .single method
        .select()

      if (error) {
        navigate('/', { replace: 'true' })
      }
      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
        console.log(data)
      }
    }

    fetch()
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !rating || !method) {
      setFormError('Please Fill all the Fields.');
      return;
    }

      const { data, error } = await supabase
        .from('testTable')
        .update({title, method, rating})
        .eq('id', id) // Now this will give the output in a Array
        .single() // To Get the output from the supabase as a single Object we use .single method
        .select()

      if (error) {
        setFormError("Please Complete the Form")
      }
      if (data) {
        console.log(data, 'data')
        setFormError(null)
        navigate('/')
      }

  }

  return (
    <div className="page update">
      <h2>Update - {id}</h2>

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
        <button>Update Smoothie Recipe</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update