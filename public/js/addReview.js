const reviewFormHandler = async (event) => {
    event.preventDefault();
  alert("hi")
    const product_name = document.querySelector('#productname').value.trim();
    const comment_info = document.querySelector('#userReview').value.trim();
    const img_url = document.querySelector('#img_url').value.trim();
  
    if (product_name && comment_info && img_url) {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ product_name, comment_info, img_url }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
  .querySelector('#review-form')
  .addEventListener('submit', reviewFormHandler);
