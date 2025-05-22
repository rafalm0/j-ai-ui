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
  $$payload.out += `<div class="chat-container svelte-1ku30ya"><div class="TopicList svelte-1ku30ya"><div class="column-combo svelte-1ku30ya"><div class="column-topic svelte-1ku30ya"><button class="topic-option svelte-1ku30ya">Internet effect on jobs</button> <button class="topic-option svelte-1ku30ya">Arrival of AI vs Internet</button></div> <div class="column-topic svelte-1ku30ya"><button class="topic-option svelte-1ku30ya">The increase in donuts sales since AI</button> <button class="topic-option svelte-1ku30ya">Did people think toasters would rise up?</button></div></div> <div class="custom-input-div svelte-1ku30ya"><input class="custom-input-field svelte-1ku30ya"${attr("value", input)} placeholder="Custom Topic..."> <button class="custom-input-button svelte-1ku30ya">→</button></div></div> <div class="main-box svelte-1ku30ya"><div class="messages svelte-1ku30ya"><h3 style="color: white;">Messages:</h3> <div></div> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let msg = each_array[$$index];
    $$payload.out += `<div class="message svelte-1ku30ya"${attr_style(`background-color: ${stringify(msg.chat_color)}`)}><strong>${escape_html(msg.bot)}:</strong> ${escape_html(msg.text)}</div>`;
  }
  $$payload.out += `<!--]--> `;
  Loading($$payload);
  $$payload.out += `<!----></div> <div class="continue-conv-button svelte-1ku30ya"><button class="clear-button svelte-1ku30ya">🗑️ Clear</button> <button class="svelte-1ku30ya">Continue Talking</button></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Header($$payload) {
  $$payload.out += `<div class="mainHeader svelte-122vhuy"><h1 class="Title svelte-122vhuy">The impact of AI in today's journalism.</h1> <h2 class="svelte-122vhuy">An conversation between two AIs from different times.</h2></div>`;
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
