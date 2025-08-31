import styled from "styled-components";

const Contact = () => {

  return (
    <Wrapper>
      <h2 className="common-heading"> Contact Page </h2>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3912914805373!2d72.49375717477197!3d23.082767714080173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9defab5465ef%3A0x78f0603f56bfb453!2sSAL%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1754225599217!5m2!1sen!2sin" 
        title="map"
        width="100%" 
        height="450" 
        style={{border:0}}
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"></iframe>

      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/mdkdlplr"
            method="POST"
            className="contact-inputs">
            <input
              type="text"
              placeholder="Username"
              name="Username"
              autoComplete="off"
              required
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              autoComplete="off"
              placeholder="Enter you message"
              required /> 

            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .common-heading {
      color : #0D6D26;
    }

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
          
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

export default Contact;