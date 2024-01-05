import React from 'react'
import { useState } from 'react'
import Card from './Card'

function Cards() {
    /**
     * initialize items to store an array of cards objects, it then randomizes their order.
     */
    const [ items, setItems ] = useState([
        {id: 1, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKgTdIiFehLcSrq_kWjg4os4zjWniIKwvQA&usqp=CAU', state: ''},
        {id: 1, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKgTdIiFehLcSrq_kWjg4os4zjWniIKwvQA&usqp=CAU', state: ''},
        {id: 2, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxWy0MB3Vfq0wD4VQYt97U-aNS53sBbfshIw&usqp=CAU', state: ''},
        {id: 2, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxWy0MB3Vfq0wD4VQYt97U-aNS53sBbfshIw&usqp=CAU', state: ''},
        {id: 3, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQovFnT101_w4o0-4BV-4AvYZGYX6vFKOTBw&usqp=CAU', state: ''},
        {id: 3, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQovFnT101_w4o0-4BV-4AvYZGYX6vFKOTBw&usqp=CAU', state: ''},
        {id: 4, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaow2iKQip4vi6bHFTEnuyCJm1hWZOdJ-SdA&usqp=CAU', state: ''},
        {id: 4, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaow2iKQip4vi6bHFTEnuyCJm1hWZOdJ-SdA&usqp=CAU', state: ''},
        {id: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrd-hxtsmh8dIBZ_y6xVm2kln78U5MhTBdg&usqp=CAU', state: ''},
        {id: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrd-hxtsmh8dIBZ_y6xVm2kln78U5MhTBdg&usqp=CAU', state: ''},
        {id: 6, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKLBJrfB0yhD85TGjWl7ImTZ7X8qusigwdHg&usqp=CAU', state: ''},
        {id: 6, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKLBJrfB0yhD85TGjWl7ImTZ7X8qusigwdHg&usqp=CAU', state: ''},
        {id: 7, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZ-1OJcSNxD_zOaiRyRUol1AKH5NzSOQ2Ig&usqp=CAU', state: ''},
        {id: 7, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZ-1OJcSNxD_zOaiRyRUol1AKH5NzSOQ2Ig&usqp=CAU', state: ''},
        {id: 8, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHQp16jfrdh8Eesd9gLxXVspjHRlXyh6eZzQ&usqp=CAU', state: ''},
        {id: 8, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHQp16jfrdh8Eesd9gLxXVspjHRlXyh6eZzQ&usqp=CAU', state: ''},
    ].sort(() => Math.random()-0.5))
    /**
     * initialize prev to keep track of which card was previously clicked. initialized to -1 to show
     * that no card has been clicked on the first go around.
     */
    const [ prev, setprev ] = useState(-1)
    /** 
     * checks if the current and previous card matched.
     * if they do: set their state to correct and reset prev
     * if they don't: set their status to wrong, update the state and reset card
    */
    function check(current) {
        if (items[current].id == items[prev].id) {
            items[current].state = 'correct';
            items[prev].state = 'correct';
            setprev(-1)
        }
        else {
            items[current].state = 'wrong';
            items[prev].state = 'wrong';
            setItems([...items]);
            setTimeout(() => {
                items[current].state = ''
                items[prev].state=''
                setItems([...items])
                setprev(-1)
            },10)
        }
    }
    /**
     * if no card is currently clicked, it sets the clicked card's state to active. 
     * if a card is already clicked, it invokes the check function to compare the cards.
     */
    function handleClick(id){
        if(prev==-1){
            items[id].state = 'active';
            setItems([...items]);
            setprev(id)
        }
        else {
            check(id)
        }
    }
/**
 * return a component rendering a 'board game'. 
 * this will map through our items array and render a card component for each card by passing in the relevant data.
 */
  return (
    <div>
        <div className='boardGame'>
        {/* loop through our items */}
        { items.map((item, index) => (
            <Card key={index} item={item} id={index} handleClick={handleClick} />
        ))}
        </div>
    </div>
  )
}

export default Cards
