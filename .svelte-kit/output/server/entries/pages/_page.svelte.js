import "clsx";
import { G as store_get, I as store_mutate, J as unsubscribe_stores, C as pop, z as push, K as ensure_array_like, M as attr, N as attr_style, F as escape_html, O as stringify } from "../../chunks/index.js";
import { w as writable } from "../../chunks/index2.js";
const newLoading = () => {
  const { subscribe, update, set } = writable({
    status: "IDLE",
    // IDLE, LOADING, NAVIGATING
    message: ""
  });
  function setNavigate(isNavigating) {
    update(() => {
      return {
        status: isNavigating ? "NAVIGATING" : "IDLE",
        message: ""
      };
    });
  }
  function setLoading(isLoading, message = "") {
    update(() => {
      return {
        status: isLoading ? "LOADING" : "IDLE",
        message: isLoading ? message : ""
      };
    });
  }
  return { subscribe, update, set, setNavigate, setLoading };
};
const loading = newLoading();
function Loading($$payload, $$props) {
  push();
  var $$store_subs;
  if (store_get($$store_subs ??= {}, "$loading", loading).status === "NAVIGATING") {
    setTimeout(
      () => {
        if (store_get($$store_subs ??= {}, "$loading", loading).status === "NAVIGATING") {
          store_mutate($$store_subs ??= {}, "$loading", loading, store_get($$store_subs ??= {}, "$loading", loading).status = "LOADING");
        }
      },
      400
    );
  }
  if (store_get($$store_subs ??= {}, "$loading", loading).status === "LOADING") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="svelte-1kxkma5"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Chatbot($$payload, $$props) {
  push();
  let messages = [];
  let input = "";
  const each_array = ensure_array_like(messages);
  $$payload.out += `<div class="chat-container svelte-gwetxn"><div class="TopicList svelte-gwetxn"><button class="svelte-gwetxn">Internet effect on jobs</button> <button class="svelte-gwetxn">Arrival of AI vs Internet</button> <button class="svelte-gwetxn">The increase in donuts sales since AI</button> <button class="svelte-gwetxn">Did people think toasters would rise up?</button> <div class="custom-input-div svelte-gwetxn"><input class="custom-input-field svelte-gwetxn"${attr("value", input)} placeholder="Custom Topic..."> <button class="custom-input-button svelte-gwetxn">→</button></div></div> <div class="main-box svelte-gwetxn"><div class="messages svelte-gwetxn"><h3 style="color: white;">Messages:</h3> <div></div> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let msg = each_array[$$index];
    $$payload.out += `<div class="message svelte-gwetxn"${attr_style(`background-color: ${stringify(msg.chat_color)}`)}><strong>${escape_html(msg.bot)}:</strong> ${escape_html(msg.text)}</div>`;
  }
  $$payload.out += `<!--]--> `;
  Loading($$payload);
  $$payload.out += `<!----></div> <div class="continue-conv-button svelte-gwetxn"><button class="svelte-gwetxn">Continue Talking</button></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Header($$payload) {
  $$payload.out += `<div class="mainHeader svelte-9p7725"><h1 class="Title svelte-9p7725">The impact of AI in today's journalism stuff but in Comic Sans</h1></div>`;
}
function _page($$payload) {
  $$payload.out += `<div class="Page svelte-1svl7lg">`;
  Header($$payload);
  $$payload.out += `<!----> `;
  Chatbot($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _page as default
};
