package controllers

import de.htwg.se.skyjo.Skyjo
import javax.inject._
import play.api.mvc._

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  val gameController = Skyjo.controller
  val hand = gameController.boardToString()

  def about() = Action {
    Ok(views.html.index())
  }

  def skyjo = Action {
    Ok(hand)
  }

}
