import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TmdService } from 'src/app/@shared/servicesTMD/tmd.service';

@Component({
  selector: 'tnv-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss']
})

export class PlayPageComponent implements OnInit {

  // 
  val = {
    movieTitleAttempt: ""
  };
  //

  //
  movieId: number;
  idFamousMovies: number[];


  showOverview: boolean = false;
  showReleaseDate: boolean = false;
  showVoteAverage: boolean = false;
  showOriginalLanguage: boolean = false;
  showPopularity: boolean = false;
  //

  //
  totalElapsedTime: number = 0;
  isRunning: boolean = false;
  timeIncrement: number = 30;
  cardElapsedTime: number = 0;
  totalTimeEvent = new EventEmitter<number>();

  private intervalId: any;
  //

  //variabili booleane bottoni
  clickedBtOne: boolean = false;
  clickedBtTwo: boolean = false;
  clickedBtThree: boolean = false;
  clickedBtFour: boolean = false;
  clickedBtFive: boolean = false;
  //

  //
  youWon: boolean = false;
  showGame: boolean = false;
  showError: boolean = false;

  //
  savedTotalTime: number = 0;
  //


  constructor(public tmdService: TmdService) {
    //array di id selezionati per ottenere film specifici
    this.idFamousMovies = [
      550, 346698, 298618, 1366, 6075, 59440, 391, 508943, 597, 107, 438695, 329, 76203, 70, 38286, 627, 862, 640, 24, 530915, 424694, 524, 538362, 406, 37165, 600, 500, 439, 111, 103, 1422, 68718, 475557, 11324, 11, 603, 98, 16869, 185, 857, 694, 8587, 299534, 744, 281957, 1396, 559969, 77338, 28, 105, 207, 73, 27205, 807, 872585, 423, 157336, 550, 346698, 298618, 1366, 6075, 59440, 391, 508943, 597, 107, 276907, 438695, 329, 76203, 70, 38286, 627, 862, 640, 24, 530915,
      424694, 524, 538362, 406, 37165, 600, 500, 439, 111, 103, 1422, 68718, 475557, 11324, 11, 603, 98, 16869, 185, 857, 694, 8587, 299534, 744, 281957,
      1396, 559969, 77338, 28, 105, 207, 73, 27205, 807, 872585, 423, 157336
    ];
    //generazione random dall'array di id selezionati
    this.movieId = this.idFamousMovies[Math.floor(Math.random() * this.idFamousMovies.length)];

  }


  ngOnInit(): void {
    this.tmdService.getMovie(this.movieId)

  }

  //timer//

  startTimer() {
    this.isRunning = true;
    this.showGame = true;
    this.intervalId = setInterval(() => {
      this.totalElapsedTime++;
    }, 1000);
  }

  stopTimer() {
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.totalTimeEvent.emit(this.totalElapsedTime + this.cardElapsedTime);
  }

  addTime() {
    this.totalElapsedTime += this.timeIncrement;
  }

  restartTimer() {
    this.totalElapsedTime = 0;
    this.cardElapsedTime = 0;
    this.isRunning = false;
    clearInterval(this.intervalId);
  }
  //timer//

  //apparizione degli indizi + aggiunta di 30 secondi
  onClickButtonShowOverview() {
    this.showOverview = true;
    this.addTime()
    this.clickedBtOne = true;
  }

  onClickButtonShowReleaseDate() {
    this.showReleaseDate = true;
    this.addTime()
    this.clickedBtTwo = true;

  }

  onClickButtonShowVoteAverage() {
    this.showVoteAverage = true;
    this.addTime()
    this.clickedBtThree = true;
  }

  onClickButtonShowOriginalLanguage() {
    this.showOriginalLanguage = true;
    this.addTime()
    this.clickedBtFour = true;
  }

  onClickButtonShowPopularity() {
    this.showPopularity = true;
    this.addTime()
    this.clickedBtFive = true;
  }

  checkIfMovieCorrect(guessMovieForm: NgForm, movieTitle: string) {
    console.log(movieTitle);
    if (this.val.movieTitleAttempt.toLowerCase() === movieTitle.toLowerCase()) {
      console.log("Bravo, hai vinto!");
      this.savedTotalTime = this.totalElapsedTime;
      this.stopTimer();
      this.youWon = true;
    } else {
      this.showError = true;
    }
  }
  giocaAncora() {
    location.reload();
  }
}


















