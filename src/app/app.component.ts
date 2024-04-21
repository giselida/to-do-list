import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { Task } from './interface/task.interface';
import { ToastService } from './service/toasts.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'to-do-list';
  tasks: Task[] = [];
  id: number = 0;
  taskControl = new FormControl('', Validators.required);
  allComplete: boolean = false;
  isFavorite: boolean = false;
  editingTask: Task | null;
  toastService = inject(ToastService);

  ngOnInit(): void {
    this.tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
  }

  addTask() {
    if (!this.taskControl.value) return;

    this.tasks.push({
      id: ++this.id,
      name: this.taskControl.value,
      completed: false,
      favorite: false,
    });
    this.toastService.success('Tarefa adicionada com sucesso');

    this.taskControl.reset();
    this.setTasksInStorage();
  }

  updateTask() {
    if (!this.editingTask) return;
    this.editingTask.name = this.taskControl.value ?? '';
    this.editingTask = null;
    this.toastService.success('Tarefa atualizada com sucesso');
    this.taskControl.reset();
    this.setTasksInStorage();
  }

  cancelEditing() {
    this.editingTask = null;
    this.toastService.error('edição cancelada');
    this.taskControl.reset();
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    this.toastService.success('Tarefa removida com sucesso');
    this.setTasksInStorage();
  }

  editTask(task: Task) {
    this.editingTask = task;
    this.taskControl.patchValue(task.name);
  }

  updateAllComplete() {
    this.allComplete = this.tasks.every((task) => task.completed);
  }

  someComplete(): boolean {
    return (
      this.tasks.filter((task) => task.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAllComplete(completed: boolean) {
    this.allComplete = completed;
    this.tasks.forEach((task) => (task.completed = completed));
  }
  toggleFavorite(task: Task): void {
    task.favorite = !task.favorite;
    this.toastService.success(
      `Tarefa ${task.name} marcada como ${
        task.favorite ? 'favorita' : 'não favorita'
      }`
    );
    this.setTasksInStorage();
  }
  private setTasksInStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('id', JSON.stringify(this.id));
  }
}
