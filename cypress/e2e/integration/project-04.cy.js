/// <reference types="cypress"/>

import toDoList from "../../Pages/toDoList"

const toDoListVerification = new toDoList

describe('Project04 - Todo-App Modal', () => {
  beforeEach(() => {
    cy.visit('https://www.techglobal-training.com/frontend/project-6');
  })
  it('Test Case 01 - Todo-App Modal Verification', () => {

toDoListVerification.getToDoAppTitle().should('be.visible').and('contain','My Tasks')
toDoListVerification.getNewTodoInputField().should('be.enabled')
toDoListVerification.getAddButton().should('be.enabled')
toDoListVerification.getSearchField().should('be.enabled')
toDoListVerification.getMassage().should('have.text','No tasks found!')
})
  it('Test Case 02 - Single Task Addition and Removal', () => {

toDoListVerification.getNewTodoInputField().type('task')
toDoListVerification.getAddButton().click()
toDoListVerification.getTaskList().should('be.visible')
toDoListVerification.getTaskList().should('have.text','task').and('have.length', 1)
toDoListVerification.getTaskList().click()
toDoListVerification.getItemMarked().should('be.visible')
toDoListVerification.getRemoveButton().click()
toDoListVerification.getMassage().should('have.text','No tasks found!')
})

it('Test Case 03 - Multiple Task Operations', () => {
 
 const todoLists = ['task1','task2','task3','task4','task5']
 todoLists.forEach(todoList => {
 toDoListVerification.getNewTodoInputField().type(todoList + `{enter}`).clear()
 })

toDoListVerification.getTaskList().each(($el,index) => {
 cy.wrap($el).should('contain',todoLists[index])
 })

 toDoListVerification.getTaskList().each(($el ,index) => {
  cy.wrap($el).click(index).should('be.visible')
 })
 toDoListVerification.getRemoveButton().click()
 toDoListVerification.getMassage().should('have.text','No tasks found!')

})
it('Test Case 04 - Search and Filter Functionality in todo App',() =>{

const todoLists = ['task1','task2','task3','task4','task5']
todoLists.forEach(todoList => {
toDoListVerification.getNewTodoInputField().type(todoList + `{enter}`).clear()
})

toDoListVerification.getTaskList().should('be.visible').and('have.length','5')
toDoListVerification.getSearchField().type('task1')
toDoListVerification.getAddButton().click()
toDoListVerification.getTaskList().should('be.visible')
.and('have.text','task1')
.and('have.length','1')

})
it('Test Case 05 - Task Validation and Error Handling', () => {

toDoListVerification.getNewTodoInputField()
toDoListVerification.getAddButton().click()
toDoListVerification.getMassage().should('have.text','No tasks found!')
toDoListVerification.getNewTodoInputField().type('cdfsegtju,kultuyaszsfvhmuxdyrtsfg')
toDoListVerification.getAddButton().click()
toDoListVerification.getErrorMasage().should('have.text','Error: Todo cannot be more than 30 characters!')
toDoListVerification.getNewTodoInputField().clear().type('item')
toDoListVerification.getAddButton().click()
toDoListVerification.getTaskList().should('be.visible').and('have.length','1')
toDoListVerification.getNewTodoInputField().clear().type('item')
toDoListVerification.getAddButton().click()
toDoListVerification.getErrorMasage().should('have.text','Error: You already have item in your todo list.')
})
})