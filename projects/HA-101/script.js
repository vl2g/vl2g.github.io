function openTab(event, tabName) {
  const tabs = document.querySelectorAll('.project-tab');
  const panes = document.querySelectorAll('.tab-pane');
  tabs.forEach(tab => tab.classList.remove('is-active'));
  panes.forEach(pane => pane.classList.remove('is-active'));
  
  event.currentTarget.classList.add('is-active');
  document.getElementById(tabName).classList.add('is-active');
}
