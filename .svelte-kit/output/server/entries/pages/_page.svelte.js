import "clsx";
import { d as ensure_array_like, f as attr, h as attr_style, e as escape_html, i as stringify } from "../../chunks/index.js";
function Chatbot($$payload) {
  let messages = [];
  let input = "";
  const each_array = ensure_array_like(messages);
  $$payload.out += `<div class="chat-container svelte-v6mqcw"><div class="TopicList svelte-v6mqcw"><button class="svelte-v6mqcw">Internet effect on jobs</button> <button class="svelte-v6mqcw">To do...</button> <button class="svelte-v6mqcw">To do...</button> <button class="svelte-v6mqcw">To do...</button> <input${attr("value", input)} placeholder="Custom Topic..." class="svelte-v6mqcw"> <div class="marginLeft svelte-v6mqcw"><button class="svelte-v6mqcw">Start New Topic</button></div></div> <div class="main-box svelte-v6mqcw"><div class="messages svelte-v6mqcw"><h3 style="color: white;">Messages:</h3> <div></div> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let msg = each_array[$$index];
    $$payload.out += `<div class="message svelte-v6mqcw"${attr_style(`background-color: ${stringify(msg.chat_color)}`)}><strong>${escape_html(msg.bot)}:</strong> ${escape_html(msg.text)}</div>`;
  }
  $$payload.out += `<!--]--></div> <div class="marginLeft svelte-v6mqcw"><button class="svelte-v6mqcw">Continue Talking</button></div></div></div>`;
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
