namespace Kliensoldali_FF_backend.Models
{
    public class Cart
    {
        public List<CartItem> Items { get; set; } = new List<CartItem>();

        public void AddItem(Product product, int quantity)
        {
            if (quantity < 0)
                throw new ArgumentException("Quantity cannot be negative.");

            var item = Items.FirstOrDefault(i => i.Product.Id == product.Id);

            if (item == null)
            {
                Items.Add(new CartItem { Product = product, Quantity = quantity });
            }
            else
            {
                item.Quantity += quantity;
            }
        }

        public void UpdateItemQuantity(Guid productId, int newQuantity)
        {
            if (newQuantity < 0)
                throw new ArgumentException("Quantity cannot be negative.");

            var item = Items.FirstOrDefault(i => i.Product.Id == productId);

            if (item != null)
            {
                item.Quantity = newQuantity;
            }
        }


        public void RemoveItem(Guid productId)
        {
            Items.RemoveAll(i => i.Product.Id == productId);
        }

        

        public decimal GetTotalPrice()
        {
            return Items.Sum(i => i.Product.Price * i.Quantity);
        }

        public void Clear()
        {
            Items.Clear();
        }
    }

    public class CartItem
    {
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }

}
