$(document).ready(function () {
    let checkedAmeni = {};
    let checkedLocation = {};

    // to listen to cchanges on  input checkbox for amenities
    $('.amenities input[type="checkbox"]').change(function () {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            checkedAmeni[amenityId] = amenityName;
        } else {
            delete checkedAmeni[amenityId];
        }

        // update h4 with checked Amenities
        const amenityNames = Object.values(checkedAmeni).join(', ');
        $('.amenities h4').text(amenityNames || '&nbsp;');
    });

    // to listen to changes on input checkbox for States and Cities
    $('.locations input[type="checkbox"]').change(function () {
        const locationId = $(this).attr('data-id');
        const locationName = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            checkedLocation[locationId] = locationName;
        } else {
            delete checkedLocation[locationId];
        }

        const locationNames = Object.values(checkedLocation).join(', ');
        $('.locations h4').text(locationNames || '&nbsp;');
    });


    // Initial POST request to fetch and display places
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (response) {
            $.each(response, function (index, place) {
                let guestType = place.max_guest === 1 ? 'Guest' : 'Guests';
                let roomType = place.number_rooms === 1 ? 'Bedroom' : 'Bedrooms';
                let bathroomType = place.number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms';
                $('section.places').append(`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} ${guestType}</div>
                            <div class="number_rooms">${place.number_rooms} ${roomType}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} ${bathroomType}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>
                `);
            });
        }
    });

    // A new POST request is made when the search button is clicked
    const buttonEle = $('button');
    buttonEle.click(function () {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ "amenities": checkedAmenities }),
            success: function (response) {
                $('section.places').html(''); // Clear previous results
                $.each(response, function (index, place) {
                    let guestType = place.max_guest === 1 ? 'Guest' : 'Guests';
                    let roomType = place.number_rooms === 1 ? 'Bedroom' : 'Bedrooms';
                    let bathroomType = place.number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms';
                    $('section.places').append(`
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} ${guestType}</div>
                                <div class="number_rooms">${place.number_rooms} ${roomType}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} ${bathroomType}</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>
                    `);
                });
            }
        });
    });
});

