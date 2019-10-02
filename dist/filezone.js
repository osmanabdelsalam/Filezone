/*! Filezone filezone.js
 * =====================
 * Filezone is a lightweight library built on top of javascript
 * to handle files in html form.
 * currently support image preview
 * and file validation.
 *
 * @Author  Osman Abdelsalam.
 * @Email   <dev.o.alsalam@gmail.com>
 * @version 0.0.1-dev
 */

var Filezone = function(options) {
	

	this.version = "0.0.1-dev";

	let text = "Click to choose file.";
	let name = "file";
	let zones = 'undefined';

	if('undefined' != typeof options) {

		if('undefined' != typeof options.class)  {
			zones =  document.getElementsByClassName(options.class);
		}else {
			zones =  document.getElementsByClassName('filezone');
		}

		if('undefined' != typeof options.placeholder) {
			text = options.placeholder;
		}

		if('undefined' != typeof options.border) {
			background = options.border;
		}

	}else {
		zones =  document.getElementsByClassName('filezone');
	}

	let getStylesFromJSON = function(style) {
		let stringStyle  = '';
		for (var attribute in style)
     		stringStyle += (attribute+':'+style[attribute]+';');

     	return stringStyle;
	}

	let defaultZoneStyle = function() {
		zoneStyle = {
			'background-color': '#fafafa',
			'width': '100%',
			'height': '200px',
			'cursor': 'pointer',
			'text-align': 'center',
			'color': 'gray',
			'user-select': 'none',
			'transition': 'all 1s',
			'display': 'flex',
			'flex-direction': 'row',
			'justify-content': 'center'
		};
		let border = true;
		if('undefined' != typeof options) {
			if('undefined' != typeof options.style) {
				if('undefined' != typeof options.style.backgroundColor) {
					zoneStyle['background-color'] = options.style.backgroundColor;
				}

				if('undefined' != typeof options.style.width) {
					zoneStyle['width'] = options.style.width;
				}

				if('undefined' != typeof options.style.height) {
					zoneStyle['height'] = options.style.height;
				}

				if('undefined' != typeof options.style.textColor) {
					zoneStyle['color'] = options.style.textColor;
				}

				if('undefined' != typeof options.style.border) {
					if(options.style.border) {
						border = true;
					}else {
						border = false;
					}
				}
			}
		}

		if(border) {
			if('undefined' != typeof options) {
				if('undefined' != typeof options.style) {
					if('undefined' != typeof options.style.borderStyle) {
						zoneStyle['border'] = options.style.borderStyle+' 1px';
					}else {
						zoneStyle['border'] = 'groove 1px';
					}

					if('undefined' != typeof options.style.borderColor) {
						zoneStyle['border-color'] = options.style.borderColor+' !important';
					}

				}else {
					zoneStyle['border'] = 'groove 1px';
				}
			}else {
				zoneStyle['border'] = 'groove 1px';
			}
		}
		return zoneStyle;
	}

	let defaultZoneSelectedImageStyle = function(prams) {
		return {
            'background-image': prams.url,
            'background-size': '100% 100%',
            'background-repeat': 'no-repeat',
        };
	}

	let defaultHoverzoneStyle = function() {
		let zoneStyle = defaultZoneStyle();
		zoneStyle['background-color'] = '#eeeeee';
		zoneStyle['text-color'] = '#78909c';
		zoneStyle['transition'] = 'all 1s';

		return zoneStyle;
	}

	let validator = {
		isFileImage: function(file) {
		    return file && file['type'].split('/')[0] === 'image';
		}
	};

	let zoneIterator = function(zone){

		//styling zone
		let zoneStyle = defaultZoneStyle();

		zone.setAttribute('style',getStylesFromJSON(zoneStyle));
		zone.addEventListener('mouseenter',function(e) {
			zoneStyle = getStylesFromJSON(defaultHoverzoneStyle());
			if(this.getAttribute('zone-active') == null)
				this.setAttribute('style',zoneStyle);
			zoneStyle = defaultZoneStyle();
		});
		zone.addEventListener('mouseleave',function(e) {
			if(this.getAttribute('zone-active') == null)
				this.setAttribute('style',getStylesFromJSON(zoneStyle));
		});

		// getting zone attributes
		let displayText = null==zone.getAttribute('filezone-placeholder')?text:zone.getAttribute('filezone-placeholder');
		let inputName = null==zone.getAttribute('filezone-input-name')?name:zone.getAttribute('filezone-input-name');


		let input = document.createElement('input');
		let txt = document.createTextNode(displayText);
		let zoneText = document.createElement('p');

		zoneText.setAttribute('style','justify-content: center;align-self: center;');
		zoneText.appendChild(txt);

		// creating and styling input file element
		input.setAttribute('name',inputName);
		input.setAttribute('style','display:none');
		input.setAttribute('type','file');
		input.addEventListener('click',function(e){
			e.stopPropagation();
		});

		// appending input element to zone
		zone.appendChild(input);
		zone.appendChild(zoneText);

		zone.addEventListener('click',function(e) {
			input.click();
		});
		let image_path = zone.getAttribute('filezone-image-path');
		if(image_path !== null) {
			let background_style = 'background-image: url('+image_path+');background-size: 100% 100%;background-repeat:no-repeat;';

			zone.setAttribute('style',background_style);
			zone.setAttribute('image-style',background_style);
			zone.setAttribute('zone-active',true);
			zoneText.remove();
		}

		input.addEventListener('change',function(event) {

			if(this.files && this.files[0]) {
				let file = this.files[0];
				let reader = new FileReader();
				reader.onload = function(e) {
					zoneText.remove();
					let inline_styles = zone.getAttribute('style');
					if(inline_styles === null) {
						inline_styles = '';
					}else {
						if(inline_styles.includes(zone.getAttribute('image-style'))) {
							inline_styles = inline_styles.replace(zone.getAttribute('image-style'),'');
						}
					}
					if(validator.isFileImage(file)) {
						let background_style = getStylesFromJSON(
							defaultZoneSelectedImageStyle(
								{
									url:'url('+e.target.result+')'
								}
							)
						);

						zone.setAttribute('style',background_style+inline_styles);
						zone.setAttribute('image-style',background_style);
					}else {
						zoneText.textContent = file.name;
						zone.appendChild(zoneText);
					}
					zone.setAttribute('zone-active',true);
				}
				reader.readAsDataURL(input.files[0]);
			}
		});
	}

	Array.prototype.filter.call(zones, zoneIterator);
}