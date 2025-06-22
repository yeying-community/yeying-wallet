<template>
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-top">
        <img class="footer-logo" src="../../assets/img/logo.svg" alt="Logo" />
        <div class="footer-contact">
          <div class="contact-email">
            <span class="contact-label">{{ $t("common.contactUs") }}：</span>
            <span class="email-address">yeying.community@gmail.com</span>
          </div>
          <div class="social-icons">
            <img 
              src="./../../assets/img/GitHub.svg" 
              alt="GitHub" 
              class="social-icon github-icon"
            >
            <a
              target="_blank"
              href="https://www.xiaohongshu.com/user/profile/656ddc960000000020031366?xhsshare=WeixinSession&appuid=656ddc960000000020031366&apptime=1732503950&share_id=0d65734da9264065b28e61c93f220371"
              rel="noopener noreferrer"
              class="social-icon red-icon"
            >
              <img 
                src="./../../assets/img/xiaohongshu.svg" 
                alt="Xiaohongshu"
                class="redsocial-icon"
              >
            </a>
          </div>
        </div>
      </div>
      <el-divider class="divider"/>
      <div class="footer-bottom">
        <div>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=33010902004112"
            rel="noreferrer"
            target="_blank"
            class="record-link"
          >
            <span style="margin-right: 10px;">浙公网安备33010902004112号</span>
          </a>
          <a
            href="https://beian.miit.gov.cn/"
            rel="noreferrer"
            target="_blank"
            class="record-link"
          >
            <span>浙ICP备2024126729号-2</span>
          </a>
        </div>
        <span class="copyright">Copyright © 2024</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>

<style lang="less" scoped>
.footer-container {
  background-color: rgba(243, 244, 246, 0.8);
  width: 100%;
  
  .footer-content {
    max-width: 72rem;
    margin: 0 auto;
    padding: 3rem 1.25rem;
    
    @media (min-width: 1024px) {
      padding: 5rem 0;
    }
  }
  
  .footer-top {
    display: flex;
    flex-direction: column;
    
    @media (min-width: 640px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .footer-logo {
    width: 7rem;
    height: 2rem;
    margin-bottom: 1rem;
    
    @media (min-width: 640px) {
      margin-bottom: 0;
      margin-right: 0.5rem;
    }
  }
  
  .footer-contact {
    display: flex;
    flex-direction: column;
    
    @media (min-width: 640px) {
      flex-direction: row;
      align-items: center;
    }
  }
  
  .contact-email {
    display: flex;
    margin-bottom: 1rem;
    
    @media (min-width: 640px) {
      margin-bottom: 0;
      margin-right: 1.5rem;
    }
  }
  
  .contact-label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    font-family: 'PuhuiBold', sans-serif;
    white-space: nowrap;
  }
  
  .email-address {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #4b5563;
    font-family: 'PuhuiRegular', sans-serif;
    margin-left: 0.25rem;
  }
  
  .social-icons {
    display: flex;
    align-items: center;
  }
  
  .social-icon {
    width: 1.875rem;
    height: 1.875rem;
    transition: opacity 0.3s;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  .github-icon {
    margin-right: 1rem;
    
    @media (min-width: 640px) {
      margin-right: 1.5rem;
    }
  }
  
  .redsocial-icon {
    width: 100%;
    height: auto;
    transform: translateY(1px);
  }
  
  .divider {
    margin: 2.5rem 0;
    background-color: #f3f3f3;
  }
  
  .footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #000;
    font-family: 'PuhuiRegular', sans-serif;
    
    @media (min-width: 640px) {
      flex-direction: row;
      justify-content: space-between;
    }
    
    .record-link {
      color: #000;
      text-decoration: none;
      margin-bottom: 0.5rem;
      
      @media (min-width: 640px) {
        margin-bottom: 0;
      }
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    .copyright {
      white-space: nowrap;
    }
  }
}
</style>