function addEvent(element, event, delegate ) {
			if (typeof (window.event) != 'undefined' && element.attachEvent)
				element.attachEvent('on' + event, delegate);
			else 
				element.addEventListener(event, delegate, false);
		}
		
		addEvent(document, 'readystatechange', function() {
			if ( document.readyState !== "complete" ) 
				return true;
				
			let items = document.querySelectorAll("section.products ul li");
			let cart = document.querySelectorAll("#cart ul")[0];
	//		
			function updateCart(){   
        
    let total=parseInt(document.getElementById('field').value);
		
        
				let cart_items = document.querySelectorAll("#cart ul li")
				for (let i = 0; i < cart_items.length; i++) {
					let cart_item = cart_items[i];
					let quantity = cart_item.getAttribute('data-quantity');
					let price = cart_item.getAttribute('data-price');
					
					let sub_total = parseFloat(quantity * parseFloat(price));
					cart_item.querySelectorAll("span.sub-total")[0].innerHTML = " = " + sub_total;
					
					total -= sub_total;
				}
				
				 document.querySelectorAll("#cart span.total")[0].innerHTML = 'Остаток средств: '+ total +' $';
      document.querySelector("#cart #total").setAttribute('sum', total);
			}
      
			// добавление нового товара в корзину
			function addCartItem(item, id) {
				let clone = item.cloneNode(true);
				clone.setAttribute('data-id', id);
				clone.setAttribute('data-quantity', 1);
				clone.removeAttribute('id');
				
				var fragment = document.createElement('span');
				fragment.setAttribute('class', 'quantity');
				fragment.innerHTML = ' x 1';
				clone.appendChild(fragment);	
				
				fragment = document.createElement('span');
				fragment.setAttribute('class', 'sub-total');
				clone.appendChild(fragment);					
				cart.appendChild(clone);
			}
      // Обновление количества товаров
			
			function updateCartItem(item){
				let quantity = item.getAttribute('data-quantity');
				quantity = parseInt(quantity) + 1
				item.setAttribute('data-quantity', quantity);
				let span = item.querySelectorAll('span.quantity');
				span[0].innerHTML = ' x ' + quantity;
			}
			
      	// Подключение функции drop 
			function onDrop(event){			
				if(event.preventDefault) event.preventDefault();
				if (event.stopPropagation) event.stopPropagation();
				else event.cancelBubble = true;
				
				let id = event.dataTransfer.getData("Text");
				let item = document.getElementById(id);			
					
    //Проверка на наличие товара в корзине
				let exists = document.querySelectorAll("#cart ul li[data-id='" + id + "']");

  let limit = +parseInt(document.getElementById('field').value);
       let total = +parseInt(document.querySelector("#cart #total").getAttribute("sum"));
    let sub_total = +item.getAttribute("data-price");
        
        if(limit<0){
          alert('Сумма не должна быть отрицательной');
          updateCart();
       }
        else if (total<sub_total) {
        alert('Вы превышаете кредит!');
          updateCart();
        
        }  else if(exists.length > 0) {
					updateCartItem(exists[0]);
				} else {
					addCartItem(item, id);
				}
				
				updateCart();
				
				return false;
			}
			
			function onDragOver(event){
				if(event.preventDefault) event.preventDefault();
				if (event.stopPropagation) event.stopPropagation();
				else event.cancelBubble = true;
				return false;
			}

			addEvent(cart, 'drop', onDrop);
			addEvent(cart, 'dragover', onDragOver);
      
      	// с помощью dataTransfer.setData указываем стандартные эффекты для перетаскивания
			function onDrag(event){
				event.dataTransfer.effectAllowed = "move";
				event.dataTransfer.dropEffect = "move";
				let target = event.target || event.srcElement;
				let success = event.dataTransfer.setData('Text', target.id);
			}
				
			
			for (let i = 0; i < items.length; i++) {
				let item = items[i];
				item.setAttribute("draggable", "true");
				addEvent(item, 'dragstart', onDrag);
			};
		});


 const submit = document.getElementById('modify_input');
  let limit = submit.addEventListener('click', () => {
  let input=parseInt(document.getElementById('field').value);
  
    alert('Вы можете заказать в нашем магазине товаров на сумму до  '+ input + " $");
    document.querySelector("#cart #total").setAttribute('sum', input);
   
  return input;

});



