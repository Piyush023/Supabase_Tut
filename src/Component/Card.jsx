import { Link } from "react-router-dom"
import { supabase } from "../Config/supabaseClient"

const Card = ({ data, onDelete }) => {

    const handleDelete = async () => {
        const { formData, error } = await supabase
            .from('testTable')
            .delete()
            .eq('id', data.id)
            .select()

            if(error){
                console.log(error)
            }
            if(formData){
                console.log(formData)
                onDelete(data.id)
            }
    }

    return (
        <div className="fetchData-card">
            <h3>{data.title}</h3>
            <p>{data.method}</p>
            <div className="rating">{data.rating}</div>
            <div className="buttons">
                <Link to={'/' + data.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}
export default Card