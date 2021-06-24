function cupcakeHTML(cupcake){
    return `
        <div data-id='${cupcake.id}'>
            <li>
                ${cupcake.flavor} - ${cupcake.size} - ${cupcake.rating}
                <button class='delete'>X</button>
            </li>
            <img id='img-${cupcake.id}' src='${cupcake.image}'>
        </div>`;
}

async function showCupcakes(){
    const response = await axios.get('http://localhost:5000/api/cupcakes');
    for (let cupcake of response.data.cupcakes){
        let newCupcake = $(cupcakeHTML(cupcake));
        $('.cupcakes').append(newCupcake);
    }
}

async function deleteCupcake(e){
    e.preventDefault();
    let $cupcake = $(e.target).closest('div');
    let id = $cupcake.attr('data-id');

    await axios.delete(`http://localhost:5000/api/cupcakes/${id}`)
    $cupcake.remove();
}

async function addCupcake(e){
    e.preventDefault();
    let $flavor = $('#flavor').val();
    let $rating = $('#rating').val();
    let $size = $('#size').val();
    let $image = $('#image').val();

    const newCupcake = await axios.post(`http://localhost:5000/api/cupcakes`, {
        'flavor': $flavor,
        'rating': $rating,
        'size': $size,
        'image': $image
    });

    let cupcake = $(cupcakeHTML(newCupcake.data.cupcake));
    $('.cupcakes').append(cupcake);
    $('#cupcake-form').trigger('reset');
}

showCupcakes();
$('.cupcakes').on('click', '.delete', deleteCupcake);
$('.button').click(addCupcake)