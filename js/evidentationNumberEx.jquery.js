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
	$.fn.evidentationNumberEx = (function ()
	{



		/**
		 * Construct Function
		 *
		 * @param string | object method Název akce, nebo nastavení konstruktoru.
		 */
		function evidentationNumberEx(method)
		{
			/**
			 *	Defaultní konfigurace pluginu.
			 */
			this.defaults = {
				createView:  evidentationNumberEx.prototype.createView,
				separator: '*',
				version: '0.1'
			};


			/**
			 *	Zpracování všech elementů selektoru.
			 */
			var _this = this;
			return this.each(function(index, el) {
				//	Instantion method
				if (typeof method === 'object' || !method) {
					return evidentationNumber.prototype.init.call(this, $.fn.extend(_this.defaults, method || {}));
				}
				//	Option method
				else if (evidentationNumberEx.prototype[method]) {
					return evidentationNumberEx.prototype[method].apply(this, Array.prototype.slice.call(arguments, 1));
				}
				else {
					$.error('Method ' + method + ' does not exist on jQuery.evidentationNumber');
				}
			});
		}

		
		
		/**
		 * Vytvořit dekoraci inputu obsahující modelové prvky.
		 *
		 * @this instance pluginu.
		 * @param $DOMElement pack Wraper, do kterého umístit modely.
		 * @param object component Obsahující odkazy na všechny modelové prvky.
		 */
		evidentationNumberEx.prototype.createView = function(pack, component)
		{
			evidentationNumber.prototype.createView(pack, component);
		}



		return evidentationNumberEx;
	})();


})(jQuery);
