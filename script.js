 const message = document.getElementById("message");
      const saldoIndic = document.getElementById("saldo");
      const inputSaldo = document.getElementById("input-saldo");
      const input = document.querySelector("#input-saldo input");
      const withdrawBtn = document.querySelector("#input-saldo button");
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      let saldo = 500000;
      updateSaldo();

      inputSaldo.addEventListener("submit", async (e) => {
        e.preventDefault();
        let value = Number(input.value);
        withdrawBtn.disabled = true;

        printInElemen(message, "Tunggu 3 detik...");
        await delay(3000);
        try {
          withdrawValidation(value);
          saldo -= value;
          input.value = "";
        } catch (e) {
          printInElemen(message, e.message);
          await delay(3000);
        } finally {
          printInElemen(message, "Transaksi Selesai");
          updateSaldo();
          await delay(3000);
          printInElemen(message, "");
          withdrawBtn.disabled = false;
        }
      });

      function withdrawValidation(amount) {
        if (amount > saldo) throw new Error("Saldo tidak cukup!");
        else if (amount <= 0) throw new Error("Nilai penarikan tidak valid");
      }

      function printInElemen(selector, text) {
        selector.innerHTML = text;
      }

      function updateSaldo() {
        printInElemen(saldoIndic, `Saldo : Rp${saldo}`);
      }