const forms = document.querySelector(".forms"),
pwShowHide = document.querySelectorAll(".lock-icon"),
links = document.querySelectorAll(".link");

pwShowHide.forEach(lockIcon => {
lockIcon.addEventListener("click", () => {
  let pwFields = lockIcon.parentElement.parentElement.querySelectorAll(".password");
  
  pwFields.forEach(password => {
      if(password.type === "password"){
          password.type = "text";
          lockIcon.classList.replace("fa-lock", "fa-lock-open");
          return;
      }
      password.type = "password";
      lockIcon.classList.replace("fa-lock-open", "fa-lock");
  })
  
})
})      

links.forEach(link => {
link.addEventListener("click", e => {
 e.preventDefault(); //preventing form submit
 forms.classList.toggle("show-signup");
})
})
