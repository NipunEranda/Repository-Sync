<template>
  <div>
    <div class="main init">
      <h1>Select a system to sync</h1>
    </div>
    <div class="mt-3">
      <center>
        <div>
          <button id="github" class="ps-5 pe-5">SignIn with GitHub</button>
        </div>
        <div class="mt-2">
          <button id="gitlab" class="ps-5 pe-5 mt-1">SignIn with GitLab</button>
        </div>
      </center>
    </div>
  </div>
</template>

<style scoped>
.init {
  padding: 10px;
  text-align: center;
}

#github:hover {
  background-color: #6e40c9;
  border-color: #6e40c9;
}

#gitlab:hover{
  background-color: #fc6d26;
  border-color: #fc6d26;
}

button {
  font-weight: bolder;
}
</style>