import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";
import { Helmet } from "react-helmet";
import { Toaster } from "sonner";

const liveChatBaseUrl =
  document.location.protocol + "//" + "livechat.fpt.ai/v36/src";

const Home = () => {
  return (
    <div className="home">
      {/* <Stories /> */}
      <Toaster theme="system" />
      <Share />
      <Posts />
      <Helmet>
        <script>{`
          (function() {
            // Configs
            let liveChatBaseUrl   = '${liveChatBaseUrl}';
            let LiveChatSocketUrl = 'livechat.fpt.ai:443';
            let FptAppCode        = '75768155778d873e7e45e54a0ca004d2'; // Thay bằng mã ứng dụng của bạn
            let FptAppName        = 'HuongDanBot'; // Thay bằng tên ứng dụng của bạn
            
            // Define custom styles
            let CustomStyles = {
              // header
              headerBackground: 'linear-gradient(86.7deg, #3353a2ff 0.85%, #31b7b7ff 98.94%)',
              headerTextColor: '#ffffffff',
              headerLogoEnable: false,
              headerLogoLink: 'https://chatbot-tools.fpt.ai/livechat-builder/img/Icon-fpt-ai.png',
              headerText: 'Hỗ trợ sử dụng website',
              // main
              primaryColor: '#6d9ccbff',
              secondaryColor: '#ecececff',
              primaryTextColor: '#ffffffff',
              secondaryTextColor: '#000000DE',
              buttonColor: '#b4b4b4ff',
              buttonTextColor: '#ffffffff',
              bodyBackgroundEnable: false,
              bodyBackgroundLink: '',
              avatarBot: 'https://chatbot-tools.fpt.ai/livechat-builder/img/bot.png',
              sendMessagePlaceholder: 'Nhập tin nhắn',
              // float button
              floatButtonLogo: 'https://chatbot-tools.fpt.ai/livechat-builder/img/Icon-fpt-ai.png',
              floatButtonTooltip: 'FPT.AI xin chào',
              floatButtonTooltipEnable: true,
              // start screen
              customerLogo: 'https://chatbot-tools.fpt.ai/livechat-builder/img/bot.png',
              customerWelcomeText: 'Vui lòng nhập tên của bạn',
              customerButtonText: 'Bắt đầu',
              prefixEnable: true,
              prefixType: 'radio',
              prefixOptions: ["Anh","Chị"],
              prefixPlaceholder: 'Danh xưng',
              // custom css
              css: ''
            };

            // Get bot code from url if FptAppCode is empty
            if (!FptAppCode) {
              let appCodeFromHash = window.location.hash.substr(1);
              if (appCodeFromHash.length === 32) {
                FptAppCode = appCodeFromHash;
              }
            }

            // Set Configs
            let FptLiveChatConfigs = {
              appName: FptAppName,
              appCode: FptAppCode,
              themes : '',
              styles : CustomStyles
            };

            // Append Script
            let FptLiveChatScript  = document.createElement('script');
            FptLiveChatScript.id   = 'fpt_ai_livechat_script';
            FptLiveChatScript.src  = liveChatBaseUrl + '/static/fptai-livechat.js';
            document.body.appendChild(FptLiveChatScript);

            // Append Stylesheet
            let FptLiveChatStyles  = document.createElement('link');
            FptLiveChatStyles.id   = 'fpt_ai_livechat_script';
            FptLiveChatStyles.rel  = 'stylesheet';
            FptLiveChatStyles.href = liveChatBaseUrl + '/static/fptai-livechat.css';
            document.body.appendChild(FptLiveChatStyles);

            // Init
            FptLiveChatScript.onload = function () {
              fpt_ai_render_chatbox(FptLiveChatConfigs, liveChatBaseUrl, LiveChatSocketUrl);
            };
          })();
        `}</script>
      </Helmet>
    </div>
  );
};

export default Home;
