<template>
  <main>
    <RouterView />
  </main>
</template>
<style lang="scss">
body {
  margin: 0;
  font-family: "Flexo", sans-serif;
}
.flex-column {
  display: flex;
  flex-direction: column;
}

input {
  border: 1px solid #c2c0c04f;
  border-radius: 50px;
  margin: 6px;
  height: 40px;
  padding-left: 10px;
}

button.primary {
  border: 1px solid transparent;
  background-color: #4dad5b;
  height: 30px;
  border-radius: 50px;
  padding: 0 30px;
  font-weight: 600;
  font-size: 16px;
  color: white;
  cursor: pointer;
}
button.primary:hover {
  color: black;
  border: 1px solid #4dad5b;
  background-color: white;
}
.text-center {
  text-align: center;
}
.bh-table-responsive table{
  background: white;
}
.bh-table-responsive table tfoot tr,
.bh-table-responsive table thead tr {
  background-color: #4361ee !important;
  color: white;
}
</style>
