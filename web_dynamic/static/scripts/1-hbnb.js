$(document).ready( function() {
	let checkedAmenities = {};
	let listItemsEle = $('DIV.amenities DIV.popover INPUT');
	listItemsEle.each(
		function() {
			$(this).click(
				function() {
					/* Retrieve the amenity name and id from data attributes */
					const amenityId = $(this).attr('data-id');
					const amenityName = $(this).attr('data-name');
					/* Check if current list item is checked and if the dictionary has the current amenity stored */
					if ($(this).not(':checked') && checkedAmenities.hasOwnProperty(amenityName)) {
						delete checkedAmenities[amenityName];
						/* Change the contents of the h4 element */
						if (Object.keys(checkedAmenities).length === 0) {
							const hFourEle = $('DIV.amenities H4');
							hFourEle.html('&nbsp;');
						} else {
							amenitiesList = Object.keys(checkedAmenities);
							str = amenitiesList.join(', ')
							/* Change the contents of the h4 element */
							const hFourEle = $('DIV.amenities H4');
							hFourEle.html(str);
						}
					} else {
						checkedAmenities[amenityName] = amenityId;
						amenitiesList = Object.keys(checkedAmenities);
						str = amenitiesList.join(', ')
						/* Change the contents of the h4 element */
						const hFourEle = $('DIV.amenities H4');
						hFourEle.html(str);
					}
				}
			);
		}
	);
});
