import './home.css'
import Header from '../../components/header/header';
import MenuCategories from '../../components/menuCategories/menuCategories';
import { useState } from 'react';
import DishDisplay from '../../components/dishDisplay/dishDisplay';
import AppDownload from '../../components/appDownload/appDownload';

function Home() {
    const [menuCategory, setMenuCategory] = useState("");

    return (
        <div className='home-component'>
            <Header/>
            <MenuCategories menuCategory={menuCategory} setMenuCategory={setMenuCategory}/>
            <DishDisplay category={menuCategory}/>
            <AppDownload/>
        </div>
    );
}

export default Home;
