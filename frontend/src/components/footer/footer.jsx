import './footer.css'

function Footer() {
    return (
        <div className='footer'>
            <div className='top-majority'>
                <div className='left-area'>
                    <h2>Foodi</h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Quidem hic dolor odio deleniti ullam tenetur nesciunt doloribus, 
                        vero minima enim ipsa eum repellat praesentium, natus explicabo 
                        perspiciatis corporis commodi laudantium?
                    </p>
                </div>
                <div className='middle-area'>
                    <h3>COMPANY</h3>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='right-area'>
                    <h3>GET IN TOUCH</h3>
                    <ul>
                        <li>+1-123-456-7890</li>
                        <li>william@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className='copyright'>Copyright 2025 © Foodi.ca - All Rights Reserved.</p>
        </div>
        
    );
}

export default Footer;

