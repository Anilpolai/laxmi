import React from 'react'
import './contact.css'
import ContactForm  from './ContactForm'


const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <b>Because Every Thread of Communication Matters</b>
      <p>
        At <b>Laxmi Ethnics</b>, we believe that true beauty lies not just in the
        fabric we wear — but in the relationships we weave. Our journey in ethnic
        fashion is deeply rooted in connection — with tradition, with artistry, and
        most importantly, with you — our cherished customer.
      </p>

      <h2>We’re Listening. We’re Responding. We Care.</h2>
      <p>
        We know how important it is to feel heard — especially when it comes to
        shopping online. From product-related queries to post-purchase support,
        every message you send is personally read and handled with care. We don’t
        believe in generic responses — we believe in meaningful service.
      </p>

      <h3>Here’s how we can help you:</h3>

      <p className="sub-heading">📦 Product Support</p>
      <p>
        Need more information about a particular kurti set, unsure of the fit of a
        co-ord set, or want to know about fabric feel? Reach out for personal style
        guidance and garment details.
      </p>

      <p className="sub-heading">🚚 Order & Delivery Support</p>
      <p>
        Tracking issues, shipping delays, delivery mishaps — we know these things
        happen, and we’re here to solve them efficiently and compassionately.
      </p>

      <p className="sub-heading">↩️ Return & Refund Assistance</p>
      <p>
        Didn’t love your order? We’ll guide you through the easy return/refund
        process — no stress, no confusion.
      </p>

      <p className="sub-heading">🎨 Custom Orders or Bulk Inquiries</p>
      <p>
        Looking to place a group order for a family function or office event? Want
        customization for a wedding? Let’s create something special together.
      </p>

      <p className="sub-heading">🤝 Collaborations & Partnerships</p>
      <p>
        Whether you're an influencer, boutique owner, or stylist, we’d love to
        collaborate. We support and celebrate those who amplify our values.
      </p>

      <h2>📞 Call Us Directly</h2>
      <p>
        Want to talk to a real person instead of waiting for an email reply?
        <br />
        <b>Customer Care Line: +91 9409222049</b>
      </p>
      <p>
        🕒 Available <b>Monday to Saturday | 09:30 AM – 06:30 PM IST</b>
      </p>
      <p>We’re here to guide you with everything from sizing concerns to gifting suggestions.</p>

      <h2>✉️ Prefer to Write to Us?</h2>
      <p>
        We aim to respond to all emails within <b>24–48 business hours</b> with
        empathy and resolution.
      </p>

      <p><b>Customer Queries:</b> laxmiethnics0@gmail.com</p>
      <p><b>Business Inquiries:</b> laxmiethnics0@gmail.com</p>
      <p><b>Feedback / Suggestions:</b> laxmiethnics0@gmail.com</p>

      <h2>Why Your Message Matters to Us</h2>
      <p>
        Each garment at Laxmi Ethnics is touched by the hands of Indian artisans — 
        and each interaction we have with you is touched by heart. When you reach
        out to us, you're not just reaching a customer care team — you're
        connecting with a brand built on emotion, empowerment, and empathy.
      </p>
      <p>
        We’re here to serve not just your wardrobe, but your experience — because{" "}
        <b>fashion isn’t just worn; it’s felt.</b>
      </p>
      <p>
        Whether you’re asking about a kurti, checking on an exchange, or simply
        saying “hello,” know that we’re deeply grateful you took the time to reach
        us.
      </p>

      <hr />

        <ContactForm />
    </div>
  )
}
export default Contact