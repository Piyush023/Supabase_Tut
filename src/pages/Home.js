import { useState } from "react";
import { supabase } from "../Config/supabaseClient"
import { useEffect } from "react";
import Card from "../Component/Card";

const Home = () => {
  const [fetchError, setFetchError] = useState();
  const [fetchData, setFetchData] = useState();

  const handleDelete = (id) => {
    setFetchData (prevData => {
    return prevData.filter(sm => sm.id !== id)
    })
    }

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('testTable')
        .select('*')

      if (error) {
        setFetchError("Could Not Fetch", error)
        setFetchData(null)
        console.log(error)
      }
      if (data) {
        setFetchData(data)
        setFetchError(null)
      }
    }

    fetch()
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>
        {fetchError}
      </p>)}
      {fetchData && (
        <div className="fetchData">
          <div className="fetchData-grid">
            {fetchData.map((item, index) => {
              return (
                <Card key={index} data={item} onDelete={handleDelete} />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home