# Filezone
Filezone is a lightweight library built on top of javascript to handle files in html forms.

## Main features

- Image thumbnail previews.
- File validation.

## How to use filezone

First of all include filezone.js in the end of body element (before closing body element.)

### Simple way

**In a simple way** just create a **div element** and give it a **filezone** class. Filezone automatically search for all elements inside the document with class filezone then render them. After creating element with filezone class, Initialize a new Filezone object.

**Example**
```html
<body>
	<form method="post" action="#" enctype="multipart/form-data">
		<div class="filezone"></div>
	</form>
	
	<script src="filezone.js"></script>
	<script>
		var fileHandler = new Filezone();
	</script>
</body>
```

### Available Filezone attributes
1. **filezone-placeholder** to change the default displayed text in filezone box just add **filezone-placeholder** attrubute and give it a text you want.

**Example:**
```html
<div
	class="filezone"
	filezone-placeholder="click here to choose your profile image."></div>
```

2. **filezone-input-name** by default Filezone creates a new input element with type file and give it **file**  name. to change the name **file** just add attibute **filezone-input-name** and give it the name of input as you want.

**Example:**
```html
<div class="filezone" filezone-input-name="profile_image"></div>
```
**- Other example -**

```html
<div
	class="filezone"
	filezone-input-name="cert_document"
	filezone-placeholder="Click to choose your certificate document."></div>
```
3. More attributes comming soon...

### Other way

Instead of giving default filezone class to the element you can use options for more control of the filezone box. just pass a JSON Object of options to the Filezone constructor.

**Available Filezone options are:** 
1. **class** instead of giving the class name **filezone**  to element you can use any class name, and identify the class name you use to Filezone in option class. 
**Example:**

	```html
	<div 
		class="images" 
		filezone-input-name="profile_images" 
		filezone-placeholder="Click to choose your profile image"></div>
		<div 
			class="images" 
			filezone-input-name="other_image" 
			filezone-placeholder="Click to choose your Other image"></div>
		<div 
			class="files" 
			filezone-input-name="certificate_document" 
			filezone-placeholder="Click to choose your certificate document"></div>
	<script src="filezone.js"></script>
	<script>
		var imagesHandler = new Filezone({
			class: "images"
		});
		var filesHandler = new Filezone({
			class: "files"
		});
	</script>
	```

2. **placeholder** instead of using inline attribute **filezone-placeholder** foreach element you can use **placeholder** option to display one global text for all elements.

	**Example** 
	```javascript
	var fileHandler = new Filezone({
		placeholder: "Click to choose file or image."
	});
	```
	**Or for all element with same class name**
	```javascript
	var fileHandler = new Filezone({
		class: "files-images",
		placeholder: "Click to choose file or image."
	});
	```

3. **style** to change default Filezone box style use **style** option. for now 5 styles are available:
-- **border** : true|false. disable or enable box border **true** is default.
-- **borderColor** : chnage Filezone box border color.
-- **textColor** : change text color.
-- **backgroundColor** : give a Filezone box a background color you want. **gray** is default.
-- **boderStyle** : change Filezone box border style **all css border styles are valid** (none|groove|dotted|dashed|solid|inset|outset|double|ridge|hidden). **groove** is default.

	**Example** 
	```javascript
	var fileHandler = new Filezone({
		class: "files-images",
		placeholder: "Click to choose file or image.",
		style: {
			border: true,
			boderStyle: "dashed",
			borderColor: "red",
			backgroundColor: "green",
			textColor: "silver"
		}
	});
	```

4. More options comming soon...

## Why Filezone?

I realize that there [are](https://www.dropzonejs.com/) other libraries out there but the reason I decided to write my own are the following:

- I want to seprate file handling in forms with multiple input components.
- Not automating upload when files were dropped in. Upload only when from submit event fired with other form input fields.
- I want to design my own file handling way.


Version 0.0.1-dev
