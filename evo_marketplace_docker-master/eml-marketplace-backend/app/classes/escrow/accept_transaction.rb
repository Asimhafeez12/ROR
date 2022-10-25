class Escrow::AcceptTransaction < Escrow::AgreeTransaction

  def data
    {
      action: "accept"
    }
  end
end
