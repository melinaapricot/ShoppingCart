import React from "react"
import "./Footer.css"

function Footer() {
  return(
    <footer className="footer">
         <div className="footer__description">
            <h3>Description</h3>
             <p>
                 Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                 sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                 sed diam voluptua.
             </p>
         </div>
        <div className="footer__nav">
             <div className="footer__explore">
                 <h3>Explore</h3>
                 <p>Home</p>
                 <p>About</p>
             </div>
            <div className="footer__help">
                <h3>Need Help?</h3>
                <p>Blog</p>
                <p>Customer Service</p>
            </div>
        </div>
    </footer>
  )
}


export default Footer
