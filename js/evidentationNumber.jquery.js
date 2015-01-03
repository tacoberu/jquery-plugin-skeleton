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
		 * @this DOMElement
		 * @param options Instance pluginu pro ten který konkrétní element.
		 *
		 * @return DOMElement
		 */
		function init(context)
		{
			//	Model
			var component = {
					'model': $(this),
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
			$(this).wrap($('<div>', {
				'css': {
					'display': 'inline-block'
					}
				}));
			$(this).hide();
			var pack = $(this).parent();
			context.createView(pack, component);
			context.updateView(component, $(this));

			return context;
		};



		/**
		 * Construct Function
		 *
		 * Touto funkcí ovládáme instanci, vytváření, čtení a nastavování
		 * atributů a hodnot. Pracujeme vždy s kolekcí elementů, což znamená,
		 * že zásahy se týkají vždy celé kolekce.
		 *
		 * @this Colection of Elements
		 * @param string | object method Název akce, nebo nastavení konstruktoru.
		 */
		function evidentationNumber(method)
		{
			//	Instantion method - create instance.
			if (typeof method === 'object' || !method) {

				/**
				 * Defaultní konfigurace pluginu.
				 * Lokální proměnná.
				 */
				var defaults = {
					updateModel: evidentationNumber.prototype.updateModel,
					updateView:  evidentationNumber.prototype.updateView,
					createView:  evidentationNumber.prototype.createView,
					separator: '/',
					version: '0.1'
				};

				/**
				 * Zpracování všech elementů selektoru. Pro každý element vytvoříme
				 * instanci pomocí funkce `init'. Výslednou instanci nalepíme na objekt elementu.
				 * $.fn.extend({}, ... ) je nutné, aby se vytvořila vždy unikátní instance objektu.
				 *
				 * @param this DOMElement
				 * @param index Of colection of Elements
				 * @param el DOMElement
				 */
				return this.each(function(index, el) {
					//	Zapsat instanci do objektu.
					this.evidentationNumber = init.call(this, $.fn.extend({}, defaults, method || {}));
					return this;
				});
			}
			//	Option method
			else if (evidentationNumber.prototype[method]) {
				var result = [];
				this.each(function(index, el) {
					result.push(evidentationNumber.prototype[method].apply(el.evidentationNumber, Array.prototype.slice.call(arguments, 1)));
				});
				return result;
			}
			else {
				$.error('Method ' + method + ' does not exist on jQuery.tacoCombobox');
			}
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
			component.model.val(nuevo.base + this.separator + nuevo.sufix);
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
			var def = model.val().split(this.separator);
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
				.append('/')
				.append(component.sufix);
		}



		return evidentationNumber;
	})();


})(jQuery);
