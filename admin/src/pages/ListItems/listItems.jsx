import { useGetItemsQuery } from '../../slices/adminAPISlices';
import './listItems.css'

function ListItems() {

    const { data, isLoading, error } = useGetItemsQuery();
    
    if (isLoading) {
        return <div>Loading…</div>;
    }

    return (
        <div className='listitem-container'>
            <h4>All Food Dishes</h4>
            <div className='listitem-grid'>
                <div className='listitem-names'>
                    <p>Image</p>
                    <p>Name</p>
                    <p>Category</p>
                    <p>Price</p>
                    <p>Action</p>
                </div>

                {data.data.map((element, index) => {
                    return (
                        <div className='listitem-row' key={index}>
                            <img src={`http://localhost:4000/images/${element.image}`}/>
                            <p>{element.name}</p>
                            <p>{element.category}</p>
                            <p>{element.price}</p>
                            <p onClick={() => console.log("hi")} className='food-dish-remove-x'>x</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListItems;