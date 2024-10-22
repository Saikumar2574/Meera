import MainComponet from "@/components/MainComponet";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full overflow-hidden">
        {/* <script
          dangerouslySetInnerHTML={{
            __html: ` 
          (function (window, document) {
              var ChatbotSDK = function (options) {
                  this.options = options || {};
                  this.init();
              };

              ChatbotSDK.prototype.init = function () {
                  this.injectCSS();
                  this.createChatbotWidget();
                  this.createOpenButton();
                  this.attachEventListeners();
              };

              ChatbotSDK.prototype.injectCSS = function () {
                  var cssLink = document.createElement("link");
                  cssLink.rel = "stylesheet";
                  cssLink.href = this.options.cssUrl || "https://test1.guruatmananda.org/bp/sdkcss.css";
                  document.head.appendChild(cssLink);
              };

              ChatbotSDK.prototype.createChatbotWidget = function () {
                  var widgetHTML = \`
                      <div id="chatbot-widget" class="chatbot-widget">
                          <div id="chatbot-header">
                              <img src="https://electronics.flowautomate.com/wp-content/uploads/2023/01/mega-electronics-logo.svg" style="max-width: 120px;">
                              <a id="close-chatbot">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                      <rect width="30" height="30" rx="14" fill="#FF0000"></rect>
                                  </svg>
                              </a>
                          </div>
                          <div id="chatbot-body">
                              \${this.renderChatContent()}
                          </div>
                          <div class="chat-footer">
                              <p><img src="https://nlp.codetrappers.in/wp-content/uploads/2024/10/push-pin-1-1.png" style="max-width: 19px;"> Pin an item and ask any questions</p>
                              <input type="text" placeholder="Ask me anything...">
                          </div>
                          <div class="powered-by">
                              Powered by Flow Automate
                          </div>
                      </div>
                  \`;

                  var widgetElement = document.createElement("div");
                  widgetElement.innerHTML = widgetHTML;
                  document.body.appendChild(widgetElement);
              };

              ChatbotSDK.prototype.renderChatContent = function () {
                  if (this.options.type === 'multi-product') {
                      return this.renderMultiProduct();
                  } else if (this.options.type === 'single-product') {
                      return this.renderSingleProduct();
                  } else {
                      return \`
                          <div class="chat-history">
                              <div class="chat-message">
                                  <img src="https://nlp.codetrappers.in/wp-content/uploads/2024/10/icons8-sparkle-100.png" alt="Profile" class="profile-img">
                                  <div class="message-content">
                                      <p>Hi, I am Meera. How can I help you today?</p>
                                  </div>
                              </div>
                          </div>
                      \`;
                  }
              };

              ChatbotSDK.prototype.renderSingleProduct = function () {
                  var product = this.options.product || {};
                  return \`
                      <div class="product-card">
                          <img src="\${product.productImage || 'https://via.placeholder.com/150'}" alt="\${product.productName}" class="product-image">
                          <div class="product-info">
                              <h2 class="product-title">\${product.productName}</h2>
                              <div class="product-price">Price: 1200</div>
                          </div>
                      </div>
                  \`;
              };

              ChatbotSDK.prototype.renderMultiProduct = function () {
                  var products = this.options.products || [];
                  if (products.length === 0) {
                      return '<p>No products available.</p>';
                  }

                  var productCards = products.map(function (product) {
                      return \`
                          <div class="image-item">
                              <img src="\${product.productImage || 'https://via.placeholder.com/150'}" alt="\${product.productName}" style="max-width: 100px;">
                          </div>
                      \`;
                  }).join('');

                  return \`
                      <div class="image-grid">
                          \${productCards}
                      </div>
                  \`;
              };

              ChatbotSDK.prototype.createOpenButton = function () {
                  var productCount = this.options.products ? this.options.products.length : 0;
                  var buttonText = this.options.type === 'multi-product' && productCount > 0
                      ? \`Ask Meera (\${productCount})\`
                      : 'Ask Meera';

                  var shortcode = document.getElementById('chatbot-shortcode');
                  
                  if (shortcode) {
                      var openButtonHTML = \`
                          <a id="open-chatbot">
                              <img width="22" src="\${this.options.icon || 'https://nlp.codetrappers.in/wp-content/uploads/2024/10/icons8-sparkle-100.png'}">
                              \${buttonText}
                          </a>
                      \`;
                      shortcode.innerHTML = openButtonHTML;
                      this.attachOpenButtonListener();
                  }
              };

              ChatbotSDK.prototype.attachOpenButtonListener = function () {
                  var self = this;
                  document.getElementById('open-chatbot').onclick = function () {
                      self.open(); // Call the open method when button is clicked
                  };
              };

              ChatbotSDK.prototype.open = function () {
                  console.log("onclikkkkkkkkkkkk")
                  this.reRenderChatContent();
                  document.getElementById('chatbot-widget').classList.add('show');
                  document.getElementById('open-chatbot').style.display = 'none';
              };

              ChatbotSDK.prototype.attachEventListeners = function () {
                  var self = this;
                  document.getElementById('close-chatbot').onclick = function () {
                      document.getElementById('chatbot-widget').classList.remove('show');
                      document.getElementById('open-chatbot').style.display = 'block';
                  };
              };

              ChatbotSDK.prototype.reRenderChatContent = function () {
                  var chatbotBody = document.getElementById('chatbot-body');
                  if (chatbotBody) {
                      chatbotBody.innerHTML = this.renderChatContent();
                  }
              };

              window.ChatbotSDK = ChatbotSDK;
          })(window, document);

          // Wait for the DOM to fully load
          document.addEventListener("DOMContentLoaded", function () {
              var chatbot = new ChatbotSDK({
                  type: 'multi-product',
                  products: [
                      { productImage: 'https://example.com/image1.jpg', productName: 'Product 1' },
                      { productImage: 'https://example.com/image2.jpg', productName: 'Product 2' }
                  ],
                  cssUrl: 'https://your-css-url.css',
                  icon: 'https://your-icon-url.png'
              });

              // Optionally call the open method here or through a button
              // chatbot.open();
          });
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: ` window.onload = function() {
    new ChatbotSDK();
  }; `,
          }}
        ></script> */}
        <div className="h-full overflow-hidden">
        {/* <div id="chatbot-shortcode"></div> */}
          <MainComponet>{children}</MainComponet>
        </div>
      </body>
    </html>
  );
}
