/**
 * Name : Riberiko Niyomwungere
 * Date : October 21, 2023
 *
 * This is the js file that is reponsible for the entire app
 * It creates the dom elements and the event listeners and so
 * much more
 **/

(function(){
	"use strict"
	window.addEventListener("load", init)

  	//CREATE GLOBAL VARABLES
  	let count = 0	
  	
  	/**
	 * Set up the application
	 */
  	function init()
  	{
	  	const form = qs('form')
		form.addEventListener('submit', addtask)

	  	const closed = id('done')
	  	const open = id('todo')
	  	const lst = [closed, open]
	  
	  	lst.forEach(temp => temp.addEventListener('drop', (e) => {
		  	e.preventDefault()
		  	const op = (temp === closed) ? open : closed;
		  	const el = op.querySelector('#'+e.dataTransfer.getData('id'))
		  	if(temp.querySelector('article') === e.target) return
		  	temp.querySelector('article').appendChild(el)
		  	ensureMoreThanOne('#done article')
		  	ensureMoreThanOne('#todo article')
		}))
	  	lst.forEach(e => e.addEventListener('dragenter', (e) => {
			e.preventDefault()
		}))
	  	lst.forEach(e => e.addEventListener('dragover', (e) => {
			e.preventDefault()
		}))
	}
	/**
	 * Adds div element to the current task article
	 * and also resets the feilds in the form
	 *
	 * @param e	the event form the form
	 **/
	function addtask(e)
	{
	  	e.preventDefault()

	  	const formData = e.target
	  	const title = formData['title'].value
	  	const startDateTime = formData['startTime'].value
	  	const endDateTime = formData['endTime'].value
	  	const entry = formData['entry'].value

	  	formData.reset()

		const currentT = id('todo').querySelector('article')

	  	const div = document.createElement('div')
	  	div.setAttribute('draggable', true)
	  	div.setAttribute('id', `card${count++}`)
	  	div.addEventListener('drag', () => {
		  div.style.opacity = '0.5'
		})
	  	div.addEventListener('dragend', () => div.style.opacity = '1')
		div.addEventListener('dragstart', (e) => {
		  e.dataTransfer.setData('id', e.target.id)
		  div.style.opacity = '0.5'
		})

	  	div.classList.add('card')
		
	  	const h3 = document.createElement('h3')
	  	h3.textContent = title
	  	
	  	const h4Start = document.createElement('h4')
	  	h4Start.textContent = 'Start: ' + startDateTime
	  	
	  	
	  	const h4End = document.createElement('h4')
	  	h4End.textContent = 'End: ' + endDateTime

	  	const p = document.createElement('p')
	  	p.textContent = entry

		div.appendChild(h3)
	  	div.appendChild(h4Start)
	  	div.appendChild(h4End)
	  	div.appendChild(p)

	  	currentT.appendChild(div)
		ensureMoreThanOne('#todo article')
	}

  	/**
	 *
	 * This is toggling the first child of the article for current
	 * tasks and completed tasks by adding and removing the hide class
	 *
	 * @param query		the query that is the location for the task artical to
	 *			run the check on
	 **/
  	function ensureMoreThanOne(query)
  	{
		const el = qs(query)
	  	if(el.children.length != 1) el.children[0].classList.add('hide')
	  	else el.children[0].classList.remove('hide')
	}
	
  	/**
	 * gets an elements by the id
	 *
	 * @param elementId	the id for the element
	 * @returns		the element object or null if not found
	 **/
	function id(elementId)
	{
		return document.getElementById(elementId)
	}
	
  	/**
	 * gets elements by the class name
	 *
	 * @param className	the name for the element
	 * @returns		the element object or null if not found
	 **/
	function cl(className)
	{
		return document.getElementsByClassName(className)
	}
	
  	/**
	 * document.querySelector
	 *
	 * @param tag		the tag for the element
	 * @returns		the element object or null if not found
	 **/
	function qs(tag)
	{
		return document.querySelector(tag)
	}
	
  	/**
	 * document. querySelectorAll
	 *
	 * @param		the tag for the element
	 * @returns		the element or null if not found
	 **/
	function qsa(tag)
	{
		return document.querySelectorAll(tag)
	}
})()
