# Thiệp sinh nhật dành cho Quỳnh

Trang thiệp dùng HTML, CSS và JavaScript thuần, được bố trí cho điện thoại và máy tính. Ảnh của Quỳnh nằm ở `img/quynh.png`.

## Trình tự tương tác

1. Màn đầu là lời mời mở quà cùng ảnh Quỳnh.
2. Bấm **Mở quà** để chuyển riêng sang màn trang trí sinh nhật có phong bì.
3. Chạm phong bì để mở lá thư. Thư hiện từng chữ; khi thư chạy đến cuối, lời ký tên và nút gửi điều ước mới xuất hiện.
4. Bấm nút điều ước, viết lời nhắn và gửi để nhận hồi âm ngay trên trang. Nội dung không được gửi lên máy chủ hay lưu lại.

## Chỉnh lời nhắn

Mở `index.js` và sửa các dòng trong `letterLines`. Đổi tên ở `index.html`. Có thể thay ảnh tại `img/quynh.png` bằng ảnh khác cùng tên tệp.

## Đưa lên mạng để tạo mã QR

Mã QR tự xuất hiện khi trang mở từ một địa chỉ web công khai; mã trỏ về đúng địa chỉ trang đó. Hãy đăng trang lên trước, rồi mở link đã xuất bản và chuyển sang màn quà để thấy mã ở cuối trang. QR không hiện khi mở bằng thư mục trên máy hoặc `localhost`.

Repo có GitHub origin. Để dùng GitHub Pages, đẩy thay đổi lên GitHub, vào **Settings → Pages**, chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, rồi lưu. Khi trang có link công khai, mở link để lấy mã QR. Ảnh QR do QRServer tạo và cần internet; dịch vụ nhận đường link trang để tạo mã. Ảnh của Quỳnh được đăng cùng trang để người có link xem được.
