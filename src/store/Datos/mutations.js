export function setUser (state ,user) {
  state.user = user
}

export function setIsLogged (state, logged) {
  state.isLogged = logged
}

export function setNewProd (state, prod) {
  state.showFormProduct = prod
}

export function setUpdateProd (state, prod) {
  state.updateFormProduct = prod
}

export function setNewUser (state, user) {
  state.showFormUser = user
}

export function setUpdateUser (state, user) {
  state.updateFormUser = user
}

export function setAddProd (state, pro) {
  state.showFormAddProduct = pro
}

export function setAlert (state, alert) {
  state.alert = alert
}

export function addToOrder (state, pro) {
  state.order.push(pro)
}

export function removeToOrder (state, index) {
  state.order.splice(index, 1);
}

export function clearOrder (state) {
  state.order = []
}

export function changeName (state, name) {
  state.namePage = name
}

export function setToken (state,token){
  state.token = token
}

export function setProducts (state,pros){
  state.products = pros
}

export function setAddProducts (state,prod){
  state.products.push(prod)
}

export function setRemoveProduct (state, index) {
  state.products.splice(index, 1);
}

export function setUsers (state,usrs){
  state.users = usrs
}

export function setAddUsers (state,usr){
  state.users.push(usr)
}

export function setRemoveUser (state, index) {
  state.users.splice(index, 1);
}

export function setTicket (state, ticket) {
  state.ticket = ticket
}

export function setCompany (state, company) {
  state.user.company = company
}

export function filterProd (state, strg) {
  if (strg != '') {
    state.products = state.products.filter(el=>{
          
      return   el.name.includes(strg)
      
     })
  }
}
/* export function addToCar (state, pros) {
  pros.map(el=>{
    state.car.push(el)
  })
} */


/* export function removeToCar (state, index) {
  state.car.splice(index, 1);
} */