/**
 *	Vzor pro vytvoření jQuery pluginu stavějící na prototypech.
 *
 *  Konstrukční funkce je funkce vytvářející instanci třídy objektu.
 *	Instanční funkce je funkce vytváčející instanci objektu. Obvykle ji pojmenováváme 
 *		init, a volá se podle zvyklostí, v případě, kdy jako první parametr je 
 *		tabulka nastavení, případně je prázdný.
 *	Option funkce je funkce, která se volá jménem uvedeným jako první parametr. 
 *		V případě, že druhý parametr je prázdný, funguje jako getter, v případě, 
 *		že je vyplněn funguje jako setter.
 *
 *  Licensed under both the MIT license and the GNU GPLv2 (same as jQuery: http://jquery.org/license)
 *
 *	@author Martin Takáč
 */
if (jQuery)(function($) {



	/**
	 * Plugin pro dekoraci input prvku na vkládání rodného čísla.
	 */
	$.fn.evidentationNumber = (function ()
	{


		/**
		 * Inicializate function for instantion.
		 *
		 * @this Window
		 * @param DOMElement
		 * @param context instance pluginu
		 */
		function init(self, context) 
		{
			//	Model
			var component = {
					'model': $(self),
					'base': $('<input>', {
							'type': 'text',
							}),
					'sufix': $('<input>', {
							'type': 'text',
							'css': {
									'width': '4em'
									}
							})
					};

			//	controler
			component.base.on('change', function() {
				context.updateModel(component, {'base': $(this).val()});
			});
			
			component.sufix.on('change', function() {
				context.updateModel(component, {'sufix': $(this).val()});
			});

			component.model.on('change', function() {
				context.updateView(component, $(self));
			});

			//	View
			$(self).wrap($('<div>'));
			$(self).hide();
			var pack = $(self).parent();
			context.createView(pack, component);
			context.updateView(component, $(self));
						
			return self;
		};



		/**
		 * Construct Function
		 *
		 * @param string | object method Název akce, nebo nastavení konstruktoru.
		 */
		function evidentationNumber(method)
		{
			/**
			 *	Defaultní konfigurace pluginu.
			 */
			this.defaults = {
				updateModel: evidentationNumber.prototype.updateModel,
				updateView:  evidentationNumber.prototype.updateView,
				createView:  evidentationNumber.prototype.createView,
				separator: '/',
				version: '0.1'
			};


			/**
			 *	Zpracování všech elementů selektoru.
			 */
			var _this = this;
			return this.each(function(index, el) {
				//	Instantion method
				if (typeof method === 'object' || !method) {
					return init(this, $.fn.extend(_this.defaults, method || {}));
				}
				//	Option method
				else if (evidentationNumber.prototype[method]) {
					return evidentationNumber.prototype[method].apply(this, Array.prototype.slice.call(arguments, 1));
				}
				else {
					$.error('Method ' + method + ' does not exist on jQuery.evidentationNumber');
				}
			});
		}



		/**
		 * Promítnutí změn do dekorovaného inputu.
		 *
		 * @this instance pluginu.
		 * @param object model Obsahující odkazy na všechny modelové prvky.
		 * @param object opts Parametry které modely chceme změnit.
		 */
		evidentationNumber.prototype.updateModel = function(component, opts)
		{
			var nuevo = {
					'base': opts.base || component.base.val(),
					'sufix': opts.sufix || component.sufix.val()
					};
			component.model.val(nuevo.base + "/" + nuevo.sufix);
		}



		/**
		 * Promítnutí změn do inputu ve view.
		 *
		 * @this instance pluginu.
		 * @param object component Obsahující odkazy na všechny modelové prvky.
		 * @param object opts Parametry které modely chceme změnit.
		 */
		evidentationNumber.prototype.updateView = function(component, model)
		{
			var def = model.val().split('/');
			component.base.val(def.length > 0 ? def[0] : null);
			component.sufix.val(def.length > 1 ? def[1] : null);
		}
		
		
		
		/**
		 * Vytvořit dekoraci inputu obsahující modelové prvky.
		 *
		 * @this instance pluginu.
		 * @param $DOMElement pack Wraper, do kterého umístit modely.
		 * @param object component Obsahující odkazy na všechny modelové prvky.
		 */
		evidentationNumber.prototype.createView = function(pack, component)
		{
			$(pack).append(component.base)
				.append(this.separator)
				.append(component.sufix);
		}



		return evidentationNumber;
	})();


})(jQuery);
