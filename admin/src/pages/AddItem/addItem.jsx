import './addItem.css'
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { useAddItemMutation } from '../../slices/adminAPISlices';

function AddItem() {

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onEventChange = (e) => {
        const input_name = e.target.name;
        const input_value = e.target.value;

        setProductData(prevProductData => ({...prevProductData, [input_name]: input_value}));
    };

    const [uploadedImage, setUploadedImage] = useState(null);

    const [ addItem ] = useAddItemMutation();

    const onSubmitHandler = async () => {
        const formdataPayload = new FormData();
        formdataPayload.append('name', productData.name);
        formdataPayload.append('description', productData.description);
        formdataPayload.append('price', productData.price);
        formdataPayload.append('category', productData.category);

        if (uploadedImage) {
            formdataPayload.append('image', uploadedImage);
        }
        
        try {
            await addItem(formdataPayload).unwrap();
            
            setProductData({
                name: "",
                description: "",
                category: "Salad",
                price: ""
            })
            setUploadedImage(null);
        } catch (error) {
            console.log('ERROR')
        }
        
    };

    return (
        <div className='additem-container'>
            <div className='upload-image'>
                <p>Upload Image</p>
                <img src={uploadedImage ? URL.createObjectURL(uploadedImage) : assets.upload_area}/>
                <input type='file' onChange={(e) => setUploadedImage(e.target.files[0])}/>
            </div>
            <div className='product-name'>
                <p>Product name</p>
                <input type='text' name='name' placeholder='Type here' value={productData.name} onChange={onEventChange}/>
            </div>
            <div className='product-description'>
                <p>Product description</p>
                <textarea type='text' name='description' placeholder='Write content here' rows='6' value={productData.description} onChange={onEventChange}/>
            </div>

            <div className='category-price-area'>
                <div className='product-category'>
                    <p>Product Category</p>
                    <select name="category" value={productData.category} onChange={onEventChange}>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className='product-price'>
                    <p>Product Price</p>
                    <input type='text' name='price' placeholder='$25' value={productData.price} onChange={onEventChange}/>
                </div>
                
            </div>
            <div className='submit-button'>
                <button onClick={onSubmitHandler}>Submit</button>
            </div>
        </div>
    );
}

export default AddItem;