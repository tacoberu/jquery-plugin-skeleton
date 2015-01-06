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
	$.fn.xpattern = (function ()
	{


		/**
		 * Inicializate function for instantion.
		 *
		 * @access Private
		 * @this DOMElement
		 * @param options Instance pluginu pro ten který konkrétní element.
		 *
		 * @return DOMElement
		 */
		function init(options)
		{
			// own code for initialize of plugin

			return options;
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
		function xpattern(method)
		{
			//	Instantion method - create instance.
			if (typeof method === 'object' || !method) {

				/**
				 * Defaultní konfigurace pluginu.
				 * Lokální proměnná.
				 */
				var defaults = {
					//	sample overiding method
					sample: xpattern.prototype.sample,

					//	sample atribute
					separator: '/',

					//	Event by done initialize.
					done: null,

					//	misc
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

					//	prevent repetitively dekorated.
					if (this.xpattern) {
						return this;
					}

					//	Zapsat instanci do objektu.
					this.xpattern = init.call(this, $.fn.extend({}, defaults, method || {}));

					//	fire done of initialize
					if (this.xpattern.done) {
						this.xpattern.done.call(this);
					}

					return this;
				});
			}
			//	Option method
			else if (xpattern.prototype[method]) {
				var result = [];
				this.each(function(index, el) {
					result.push(xpattern.prototype[method].apply(el.xpattern, Array.prototype.slice.call(arguments, 1)));
				});
				return $(result);
			}
			else {
				$.error('Method ' + method + ' does not exist on jQuery.tacoCombobox');
			}
		}



		/**
		 * @this instance pluginu.
		 * @param DOMElement element
		 * @return DOMElement element
		 */
		xpattern.prototype.sample = function(element)
		{
			return element;
		}


		return xpattern;
	})();


})(jQuery);
