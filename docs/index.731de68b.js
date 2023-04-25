const e={imageSelection:document.getElementById("image-selection"),createAccountButton:document.getElementById("create-account-button"),submitButton:document.getElementById("submit-button"),usernameInput:document.getElementById("username"),passwordInput:document.getElementById("password"),form:document.getElementById("form"),errorMessage:document.createElement("p"),userDeletedSuccessfully:document.createElement("h1"),failedToDeleteUser:document.createElement("h1"),messageInput:document.createElement("input"),listItem:document.createElement("li"),body:document.getElementById("body"),accountCreated:document.createElement("h1"),logInpage:document.getElementById("logInpage"),container:document.getElementById("container"),currentUser:document.getElementById("current-user"),statusUpdates:document.getElementById("status-updates"),newStatusUpdate:document.getElementById("new-status-update"),addStatusUpdate:document.getElementById("add-status-update"),loggedInUsersList:document.querySelector(".js-logged-in-users-list"),otherUserPageHeader:document.querySelector(".js-other-user-page-header"),deleteAccount:document.getElementById("delete-account"),deleteAccountButton:document.getElementById("delete-account-button"),statusInput:document.getElementById("status-input"),statusUpdateButton:document.getElementById("status-update-button"),otherUserPage:document.getElementById("other-user-page"),loggedInUsersPage:document.getElementById("logged-in-users-page"),statusUpdatesList:document.getElementById("status-updates-list"),submitStatus:document.getElementById("submit-status"),allUsersList:document.getElementById("allUsersList")};e.logInpage&&(e.logInpage.style.display="block"),e.container.style.display="none",e.body.appendChild(e.container);document.createElement("div").className="error-message";const t="https://social-media-68d76-default-rtdb.europe-west1.firebasedatabase.app/";async function s(){try{const e=await fetch(`${t}users.json`);if(!e.ok)throw new Error(`Error: ${e.status} ${e.statusText}`);const s=await e.json();if(!s)return[];return Object.values(s)}catch(e){throw new Error("Failed to fetch users")}}async function n(e){await s();const n=`${t}users/${e.userName}.json`,a={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8"}};try{const s=await fetch(n,a);if(!s.ok)throw new Error(`Error: ${s.status} ${s.statusText}`);if(!0===e.newUser){const s=`${t}users/${e.userName}/newUser.json`,n={method:"PUT",body:JSON.stringify(!1),headers:{"Content-type":"application/json; charset=UTF-8"}},a=await fetch(s,n);if(!a.ok)throw new Error(`Error: ${a.status} ${a.statusText}`)}}catch(e){throw console.log(e),new Error("Failed to save user information.")}}async function a(e){const s=`${t}users/${e}.json`,n={method:"DELETE"};try{const e=await fetch(s,n);if(!e.ok)throw new Error(`Error: ${e.status} ${e.statusText}`)}catch(e){throw console.log(e),new Error("Failed to delete user.")}}async function r(){return(await s()).find((e=>"logged-in"===e.status))||null}async function o(){const t=e.usernameInput.value.trim(),a=e.passwordInput.value.trim();if(t&&a)try{const r=(await s()).find((e=>e.userName===t&&e.password===a));if(r){r.status="logged-in",await n(r),e.logInpage.style.display="none",e.container.style.display="block",e.currentUser?e.currentUser.textContent=`Logged in as: ${r.userName}`:console.error("elements.currentUser is null"),u(),async function(){const t=await s(),a=t.filter((e=>"logged-in"===e.status));a.forEach((t=>{const s=document.createElement("li");s.textContent=`${t.userName}:`;const a=document.createElement("form"),r=document.createElement("input");r.type="text",r.placeholder="What's on your mind?",a.appendChild(r);const o=document.createElement("button");o.type="submit",o.textContent="Submit",o.id="statusUpdateButton",a.appendChild(o),a.addEventListener("submit",(async s=>{s.preventDefault();const a=r.value.trim();if(a){t.statusUpdates=t.statusUpdates||[],t.statusUpdates.push(a),t.newUser=!1,await n(t);const s=document.createElement("li");s.textContent=`${t.userName}: ${a}`,e.statusUpdates.appendChild(s),r.value=""}else e.errorMessage.innerHTML="Please enter a status update.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)})),s.appendChild(a),e.loggedInUsersList&&e.loggedInUsersList.appendChild(s)}))}();document.getElementById("loggedInUserHeader").textContent=`Logged in as: ${r.userName}`}else console.log(e.errorMessage),e.errorMessage.innerHTML="Incorrect username or password. Try again.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}catch(t){console.log(t),e.errorMessage.innerHTML="Failed to log in. Try again.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}else e.errorMessage.innerHTML="Please enter a username and password.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}async function u(){const t=await r();t&&t.statusUpdates&&(e.statusUpdates.innerHTML="",t.statusUpdates.forEach((s=>{const n=document.createElement("li");n.textContent=`${t.userName}: ${s}`,e.statusUpdates.appendChild(n)})))}async function d(t){const n=await async function(e){return(await s()).find((t=>t.userName===e))||null}(t);if(!n)throw new Error("User not found.");e.loggedInUsersPage.style.display="none",e.otherUserPage.style.display="block",e.otherUserPage.querySelector(".username").textContent=n.userName,e.otherUserPage.querySelector(".profile-pic").setAttribute("src",n.profilePictureUrl)}async function l(){const t=e.usernameInput.value.trim(),n=e.passwordInput.value.trim();if(t&&n)try{const r=(await s()).find((e=>e.userName===t&&e.password===n));r?(await a(r.userName),e.userDeletedSuccessfully.innerHTML="User deleted successfully!",e.body.appendChild(e.userDeletedSuccessfully),setTimeout((()=>{e.userDeletedSuccessfully.remove()}),3e3),e.usernameInput.value="",e.passwordInput.value="",e.container.style.display="none",e.logInpage.style.display="block"):(e.failedToDeleteUser.innerHTML="Failed to delete user. Incorrect username or password.",e.body.appendChild(e.failedToDeleteUser),setTimeout((()=>{e.failedToDeleteUser.remove()}),3e3))}catch(t){console.log(t),e.failedToDeleteUser.innerHTML="Failed to delete user. Try again.",e.body.appendChild(e.failedToDeleteUser),setTimeout((()=>{e.failedToDeleteUser.remove()}),3e3)}else e.errorMessage.innerHTML="Please enter a username and password.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}function c(){console.log("Create Account Button: ",e.createAccountButton),console.log("Submit Button: ",e.submitButton),console.log("Delete Account Button: ",e.deleteAccountButton),console.log("Submit Status: ",e.submitStatus),e.createAccountButton.addEventListener("click",(()=>{!async function(){const t=e.usernameInput.value.trim(),a=e.passwordInput.value.trim(),r=e.imageSelection.value.trim();if(t&&a&&r){const o=(await s()).some((e=>e.userName===t)),u={userName:t,password:a,status:"",imageurl:r,newUser:!o,statusUpdates:[]};try{await n(u),e.accountCreated.innerHTML="Account Created!",e.body.appendChild(e.accountCreated),setTimeout((()=>{e.accountCreated.remove()}),3e3)}catch(t){console.log(t),e.errorMessage.innerHTML="Failed to create account. Try again.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}}else e.errorMessage.innerHTML="Please fill in all fields.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}()})),e.submitButton.addEventListener("click",(e=>{e.preventDefault(),o()})),e.deleteAccountButton.addEventListener("click",(()=>{l()})),e.submitStatus.addEventListener("click",(t=>{t.preventDefault(),async function(){console.log("addStatusUpdate called");const t={text:e.statusInput.value.trim(),timestamp:(new Date).toISOString()};if(t.text){const s=await r();s&&(s.statusUpdates=s.statusUpdates||[],s.statusUpdates.push(t.text),s.newUser=!1,await n(s),e.statusInput.value="",u())}else e.errorMessage.innerHTML="Please enter a status update.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}()}))}!async function(){document.addEventListener("DOMContentLoaded",(async()=>{c(),await async function(){try{const t=await s(),n=document.createElement("ul");t.forEach((e=>{const t=document.createElement("li");t.textContent=e.userName,t.addEventListener("click",(()=>{d(e.userName)})),n.appendChild(t)})),e.allUsersList&&(e.allUsersList.innerHTML="",e.allUsersList.appendChild(n))}catch(e){console.log(e.message)}}()}))}();
//# sourceMappingURL=index.731de68b.js.map
