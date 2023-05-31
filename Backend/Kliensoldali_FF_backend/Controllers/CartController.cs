using Kliensoldali_FF_backend.Data;
using Kliensoldali_FF_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kliensoldali_FF_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly WebshopDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CartController(WebshopDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Cart
        [HttpGet]
        public ActionResult<Cart> GetCart()
        {
            return GetOrCreateCart();
        }

        // POST: api/Cart/{productId}
        [HttpPost("{productId}")]
        public async Task<ActionResult<Cart>> AddItemToCart(Guid productId, int quantity = 1)
        {
            var product = await _context.Products.FindAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            var cart = GetOrCreateCart();
            cart.AddItem(product, quantity);
            SaveCart(cart);

            return cart;
        }

        // PUT: api/Cart/{productId}
        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateCartItemQuantity(Guid productId, int newQuantity)
        {
            var product = await _context.Products.FindAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            var cart = GetOrCreateCart();
            cart.UpdateItemQuantity(productId, newQuantity);
            SaveCart(cart);

            return NoContent();
        }
        // DELETE: api/Cart/{productId}
        [HttpDelete("{productId}")]
        public async Task<IActionResult> RemoveItemFromCart(Guid productId)
        {
            var product = await _context.Products.FindAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            var cart = GetOrCreateCart();
            cart.RemoveItem(productId);
            SaveCart(cart);

            return NoContent();
        }

        // DELETE: api/Cart
        [HttpDelete]
        public IActionResult ClearCart()
        {
            var cart = GetOrCreateCart();
            cart.Clear();
            SaveCart(cart);

            return NoContent();
        }

        private Cart GetOrCreateCart()
        {
            var cart = _httpContextAccessor.HttpContext.Session.Get<Cart>("Cart");

            if (cart == null)
            {
                cart = new Cart();
                SaveCart(cart);
            }

            return cart;
        }

        private void SaveCart(Cart cart)
        {
            _httpContextAccessor.HttpContext.Session.Set("Cart", cart);
        }

    }
}
