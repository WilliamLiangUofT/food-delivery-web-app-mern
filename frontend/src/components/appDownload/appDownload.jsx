import './appDownload.css'
import { assets } from '../../assets/assets';

function AppDownload() {
    return (
        <div className='apps-container' id='download-app'>
            <h1>
                For a Better Experience Download the Foodi App
            </h1>
            <div className='app-icon-imgs'>
                <img src={assets.play_store}/>
                <img src={assets.app_store}/>
            </div>
            
        </div>
    );
}

export default AppDownload;

