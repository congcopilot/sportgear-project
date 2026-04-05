import { Link } from "react-router-dom";

const cartItems = [
  {
    id: 1,
    name: "Áo thể thao Dry-Fit Pro",
    variant: "Đen / Size M",
    qty: 1,
    price: 429000,
  },
  {
    id: 2,
    name: "Quần short chạy bộ AirFlex",
    variant: "Xám / Size L",
    qty: 2,
    price: 319000,
  },
];

const shippingOptions = [
  { id: "standard", label: "Tiêu chuẩn", eta: "2-4 ngày", fee: 25000 },
  { id: "express", label: "Nhanh", eta: "Trong ngày", fee: 45000 },
];

const paymentOptions = [
  { id: "cod", label: "Thanh toán khi nhận hàng" },
  { id: "bank", label: "Chuyển khoản ngân hàng" },
  { id: "card", label: "Thẻ tín dụng / thẻ ghi nợ" },
];

const formatVnd = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );

function CheckoutPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = shippingOptions[0].fee;
  const discount = 90000;
  const total = subtotal + shippingFee - discount;

  return (
    <main className="checkout-shell">
      <section className="checkout-header">
        <div>
          <p className="checkout-kicker">SportGear Checkout</p>
          <h1>Xac nhan don hang</h1>
          <p>
            Hoan tat thong tin giao nhan va phuong thuc thanh toan de dat hang.
          </p>
        </div>
        <Link className="checkout-back-link" to="/profile">
          Quay lai trang ca nhan
        </Link>
      </section>

      <div className="checkout-grid">
        <section className="checkout-main-panel">
          <article className="checkout-card">
            <h2>Thong tin nhan hang</h2>
            <div className="checkout-form-grid">
              <label>
                Ho va ten
                <input placeholder="Nguyen Van A" defaultValue="Nguyen Van A" />
              </label>
              <label>
                So dien thoai
                <input placeholder="09xx xxx xxx" defaultValue="0988 123 456" />
              </label>
              <label className="full-width">
                Dia chi
                <input
                  placeholder="So nha, duong, phuong/xa"
                  defaultValue="123 Le Loi, Phuong Ben Thanh"
                />
              </label>
              <label>
                Tinh / Thanh pho
                <input placeholder="TP. Ho Chi Minh" defaultValue="TP. Ho Chi Minh" />
              </label>
              <label>
                Quan / Huyen
                <input placeholder="Quan 1" defaultValue="Quan 1" />
              </label>
            </div>
          </article>

          <article className="checkout-card">
            <h2>Phuong thuc giao hang</h2>
            <div className="checkout-option-list">
              {shippingOptions.map((option, index) => (
                <label key={option.id} className="checkout-option-item">
                  <input type="radio" name="shipping" defaultChecked={index === 0} />
                  <div>
                    <strong>{option.label}</strong>
                    <p>{option.eta}</p>
                  </div>
                  <span>{formatVnd(option.fee)}</span>
                </label>
              ))}
            </div>
          </article>

          <article className="checkout-card">
            <h2>Phuong thuc thanh toan</h2>
            <div className="checkout-option-list">
              {paymentOptions.map((option, index) => (
                <label key={option.id} className="checkout-option-item">
                  <input type="radio" name="payment" defaultChecked={index === 0} />
                  <div>
                    <strong>{option.label}</strong>
                  </div>
                </label>
              ))}
            </div>
          </article>
        </section>

        <aside className="checkout-summary-panel">
          <article className="checkout-card summary-card">
            <h2>Don hang cua ban</h2>
            <ul className="checkout-item-list">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      {item.variant} x{item.qty}
                    </p>
                  </div>
                  <span>{formatVnd(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="checkout-total-line">
              <span>Tam tinh</span>
              <span>{formatVnd(subtotal)}</span>
            </div>
            <div className="checkout-total-line">
              <span>Giao hang</span>
              <span>{formatVnd(shippingFee)}</span>
            </div>
            <div className="checkout-total-line discount">
              <span>Khuyen mai</span>
              <span>-{formatVnd(discount)}</span>
            </div>
            <div className="checkout-total-line grand-total">
              <span>Thanh toan</span>
              <span>{formatVnd(total)}</span>
            </div>

            <button type="button" className="checkout-submit-btn">
              Dat hang ngay
            </button>
          </article>
        </aside>
      </div>
    </main>
  );
}

export default CheckoutPage;
