import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: ToastrService) {}

  show(message?: string, options?: string): ActiveToast<unknown> {
    return this.toast.show(message, options);
  }
  error(message?: string, options?: string): ActiveToast<unknown> {
    return this.toast.error(message, options);
  }
  success(message?: string, options?: string): ActiveToast<unknown> {
    return this.toast.success(message, options);
  }

  warning(message?: string, options?: string): ActiveToast<unknown> {
    return this.toast.warning(message, options);
  }
  info(message?: string, options?: string): ActiveToast<unknown> {
    return this.toast.info(message, options);
  }

  close(id?: number | undefined): void {
    this.toast.clear(id);
  }
}
