const categories = document.querySelectorAll('.category');
let scrollTimeout;



window.addEventListener('scroll', debounce(showCategory, 100));
function showCategory(){
    const calculateHeight = window.innerHeight-20;

    categories.forEach(category=>{
        const topPosition = category.getBoundingClientRect().top;
        if (topPosition<calculateHeight){
            category.classList.add('active');
        }else{
            category.classList.remove('active');
        }
    })
}

function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}